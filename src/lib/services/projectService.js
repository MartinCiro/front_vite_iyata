import api from "./api.js";
import config from 'constants/config.js';

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
      const apiProjects = response.data.slice(0, config.api.limit);
      
      const projects = apiProjects.map((post) => {
        const memoryData = memoryDB.get(post.id);
        if (memoryData) return memoryData;

        return {
          id: post.id,
          title: post.title,
          description: post.body,
          status: "active",
          created_at: new Date().toISOString(),
          user_id: post.userId,
        };
      });

      // Agregar proyectos creados localmente
      const memoryProjects = Array.from(memoryDB.values())
        .filter(project => project.id >= 1000)
        .filter(project => !projects.some(p => p.id === project.id));

      return [...memoryProjects, ...projects].sort((a, b) => b.id - a.id);
    } catch (error) {
      throw error;
    }
  }

  async getProject(id) {
    try {
      // Primero verificar si existe en memoria
      const memoryData = memoryDB.get(parseInt(id));
      if (memoryData) return memoryData;

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
      throw error;
    }
  }

  async createProject(projectData) {
    try {
      const newId = generateUniqueId();
      
      const newProject = {
        id: newId,
        title: projectData.title,
        description: projectData.description || "",
        status: projectData.status || "active",
        created_at: new Date().toISOString(),
        user_id: 1,
      };

      // Guardar en memoria
      memoryDB.set(newProject.id, newProject);
      return newProject;
    } catch (error) {
      throw error;
    }
  }

  async updateProject(id, projectData) {
    try {
      const projectId = parseInt(id);
      
      if (projectId < 1000) {
        // Para IDs de la API (1-100), hacer el PUT normal
        await api.put(`/posts/${id}`, {
          title: projectData.title,
          body: projectData.description || "",
          userId: 1,
        });
      } else {
        console.log('Updating local project in memory:', projectId);
      }

      // Obtener proyecto existente para preservar datos
      const existingProject = memoryDB.get(projectId) || {};
      
      const updatedProject = {
        id: projectId,
        title: projectData.title,
        description: projectData.description || "",
        status: projectData.status || "active",
        created_at: existingProject.created_at || new Date().toISOString(), // Preservar fecha original
        user_id: 1,
      };

      // Actualizar en memoria (para todos los casos)
      memoryDB.set(projectId, updatedProject);

      return updatedProject;
    } catch (error) {
      throw error;
    }
  }

  async deleteProject(id) {
    try {
      const projectId = parseInt(id);
      
      // 🔥 Misma lógica que taskService: Solo hacer DELETE para IDs < 1000
      if (projectId < 1000) {
        await api.delete(`/posts/${id}`);
      } else {
        console.log('Deleting local project from memory:', projectId);
      }
      
      // Eliminar de memoria (para todos los casos)
      memoryDB.delete(projectId);
      return { success: true };
    } catch (error) {
      throw error;
    }
  }

  async getProjectUsers() {
    try {
      const response = await api.get("/users");
      return response.data.slice(0, 3);
    } catch (error) {
      throw error;
    }
  }
}

export default new ProjectService();