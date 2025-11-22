import api from "./api.js";

// Simulamos una base de datos en memoria para tasks
const memoryDB = new Map();

// Generador de IDs únicos para tasks
let nextTaskId = 2000;

function generateUniqueTaskId() {
  return nextTaskId++;
}

class TaskService {
  async getTasks(projectId = null) {
    try {
      const response = await api.get("/todos");
      const apiTasks = response.data.slice(0, 20);
      
      let tasks = apiTasks.map((todo) => {
        const memoryData = memoryDB.get(todo.id);

        if (memoryData) return memoryData;

        return {
          id: todo.id,
          title: todo.title,
          description: `Task: ${todo.title}`,
          status: todo.completed ? 'done' : 'todo',
          priority: 'medium',
          due_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
          project_id: 1,
          created_at: new Date().toISOString(),
          user_id: 1
        };
      });

      // Agregar tasks creadas localmente
      const memoryTasks = Array.from(memoryDB.values())
        .filter(task => task.id >= 2000)
        .filter(task => !tasks.some(t => t.id === task.id));

      const allTasks = [...memoryTasks, ...tasks];

      if (projectId) return allTasks.filter(task => task.project_id == projectId);

      return allTasks.sort((a, b) => b.id - a.id);
    } catch (error) {
      throw error;
    }
  }

  async getTask(id) {
    try {
      // Primero verificar si existe en memoria
      const memoryData = memoryDB.get(parseInt(id));
      if (memoryData) return memoryData;

      // Si no está en memoria, buscar en la API
      const response = await api.get(`/todos/${id}`);
      const todo = response.data;

      return {
        id: todo.id,
        title: todo.title,
        description: `Task: ${todo.title}`,
        status: todo.completed ? 'done' : 'todo',
        priority: 'medium',
        due_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        project_id: 1,
        created_at: new Date().toISOString(),
        user_id: 1
      };
    } catch (error) {
      throw error;
    }
  }

  async createTask(taskData) {
    try {
      const newId = generateUniqueTaskId();
      
      const newTask = {
        id: newId,
        title: taskData.title,
        description: taskData.description || "",
        status: taskData.status || "todo",
        priority: taskData.priority || "medium",
        due_date: taskData.due_date || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        project_id: taskData.project_id || 1,
        created_at: new Date().toISOString(),
        user_id: 1
      };

      // Guardar en memoria
      memoryDB.set(newTask.id, newTask);
      return newTask;
    } catch (error) {
      throw error;
    }
  }

  async updateTask(id, taskData) {
    try {
      const taskId = parseInt(id);
      
      // Si el ID es mayor o igual a 2000, es un recurso local
      if (taskId >= 2000) {
        
        const existingTask = memoryDB.get(taskId);
        if (!existingTask) throw new Error(`Task with ID ${taskId} not found in memory`);

        const updatedTask = {
          ...existingTask,
          ...taskData,
          id: taskId 
        };

        // Actualizar en memoria
        memoryDB.set(taskId, updatedTask);
        return updatedTask;
      } else {
        await api.put(`/todos/${id}`, {
          title: taskData.title,
          completed: taskData.status === 'done',
          userId: 1
        });

        const updatedTask = {
          id: taskId,
          title: taskData.title,
          description: taskData.description || "",
          status: taskData.status || "todo",
          priority: taskData.priority || "medium",
          due_date: taskData.due_date || existingTask?.due_date || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
          project_id: taskData.project_id || 1,
          created_at: existingTask?.created_at || new Date().toISOString(),
          user_id: 1
        };

        // Actualizar en memoria también
        memoryDB.set(taskId, updatedTask);
        return updatedTask;
      }
    } catch (error) {
      throw error;
    }
  }

  async deleteTask(id) {
    try {
      const taskId = parseInt(id);
      if (taskId >= 2000) {
        memoryDB.delete(taskId);
      } else {
        await api.delete(`/todos/${id}`);
        memoryDB.delete(taskId);
      }
      
      return { success: true };
    } catch (error) {
      throw error;
    }
  }
}

export default new TaskService();