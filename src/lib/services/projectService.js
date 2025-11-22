// src/lib/services/projectService.js
import api from "./api.js";

// Simulamos una base de datos en memoria para mantener la consistencia
const memoryDB = new Map();

// Generador de IDs únicos
let nextId = 1000; // Empezar desde un número alto para evitar conflictos

function generateUniqueId() {
  return nextId++;
}

class ProjectService {
  async getProjects() {
    try {
      const response = await api.get("/posts");
      const apiProjects = response.data.slice(0, 10); // Limitar a 10 proyectos de la API
      
      const projects = apiProjects.map((post) => {
        // ✅ PRIORIDAD a los datos en memoria sobre JSONPlaceholder
        const memoryData = memoryDB.get(post.id);

        // Si existe en memoria, usar esos datos (incluyendo cambios)
        if (memoryData) {
          return memoryData;
        }

        // Si no, usar datos de JSONPlaceholder
        return {
          id: post.id,
          title: post.title,
          description: post.body,
          status: "active",
          created_at: new Date().toISOString(),
          user_id: post.userId,
        };
      });

      // 🔥 AGREGAR proyectos creados localmente que no existen en la API
      const memoryProjects = Array.from(memoryDB.values())
        .filter(project => project.id >= 1000) // Solo proyectos creados localmente
        .filter(project => !projects.some(p => p.id === project.id)); // Que no estén ya en la lista

      return [...memoryProjects, ...projects].sort((a, b) => b.id - a.id); // Ordenar por ID descendente
    } catch (error) {
      console.error("Error fetching projects:", error);
      throw error;
    }
  }

  async getProject(id) {
    try {
      // Primero verificar si existe en memoria
      const memoryData = memoryDB.get(parseInt(id));
      if (memoryData) {
        return memoryData;
      }

      // Si no está en memoria, buscar en la API
      const response = await api.get(`/posts/${id}`);
      const post = response.data;

      return {
        id: post.id,
        title: post.title,
        description: post.body,
        status: "active",
        created_at: new Date().toISOString(),
        user_id: post.userId,
      };
    } catch (error) {
      console.error("Error fetching project:", error);
      throw error;
    }
  }

  async createProject(projectData) {
    try {
      // 🔥 GENERAR ID ÚNICO en el cliente
      const newId = generateUniqueId();
      
      const newProject = {
        id: newId,
        title: projectData.title,
        description: projectData.description || "",
        status: projectData.status || "active",
        created_at: new Date().toISOString(),
        user_id: 1,
      };

      // Guardar en memoria para mantener la consistencia
      memoryDB.set(newProject.id, newProject);

      // También hacer el POST a la API (aunque no persista)
      await api.post("/posts", {
        title: projectData.title,
        body: projectData.description || "",
        userId: 1,
      });

      console.log('Project created with ID:', newProject.id); // Debug
      return newProject;
    } catch (error) {
      console.error("Error creating project:", error);
      throw error;
    }
  }

  async updateProject(id, projectData) {
    try {
      const projectId = parseInt(id);
      
      await api.put(`/posts/${id}`, {
        title: projectData.title,
        body: projectData.description || "",
        userId: 1,
      });

      const updatedProject = {
        id: projectId,
        title: projectData.title,
        description: projectData.description,
        status: projectData.status || "active",
        created_at: new Date().toISOString(),
        user_id: 1,
      };

      // Actualizar en memoria
      memoryDB.set(projectId, updatedProject);

      return updatedProject;
    } catch (error) {
      console.error("Error updating project:", error);
      throw error;
    }
  }

  async deleteProject(id) {
    try {
      await api.delete(`/posts/${id}`);
      // Eliminar de memoria
      memoryDB.delete(parseInt(id));
      return { success: true };
    } catch (error) {
      console.error("Error deleting project:", error);
      throw error;
    }
  }

  async getProjectUsers() {
    try {
      const response = await api.get("/users");
      return response.data.slice(0, 3);
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  }
}

export default new ProjectService();