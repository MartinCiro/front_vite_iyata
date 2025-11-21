import { reactive, computed } from 'vue';
import TaskService from '../services/taskService.js';

export function useTasks() {
  const state = reactive({
    tasks: [],
    currentTask: null,
    isLoading: false,
    error: null
  });

  const fetchTasks = async (projectId = null) => {
    state.isLoading = true;
    state.error = null;
    try {
      state.tasks = await TaskService.getTasks(projectId);
    } catch (error) {
      state.error = error.message;
      throw error;
    } finally {
      state.isLoading = false;
    }
  };

  const fetchTask = async (id) => {
    state.isLoading = true;
    state.error = null;
    try {
      state.currentTask = await TaskService.getTask(id);
    } catch (error) {
      state.error = error.message;
      throw error;
    } finally {
      state.isLoading = false;
    }
  };

  const createTask = async (taskData) => {
    state.isLoading = true;
    state.error = null;
    try {
      const newTask = await TaskService.createTask(taskData);
      state.tasks.push(newTask);
      return newTask;
    } catch (error) {
      state.error = error.message;
      throw error;
    } finally {
      state.isLoading = false;
    }
  };

  const updateTask = async (id, taskData) => {
    state.isLoading = true;
    state.error = null;
    try {
      const updatedTask = await TaskService.updateTask(id, taskData);
      const index = state.tasks.findIndex(t => t.id === id);
      if (index !== -1) state.tasks[index] = updatedTask;
      if (state.currentTask?.id === id) state.currentTask = updatedTask;
      
      return updatedTask;
    } catch (error) {
      state.error = error.message;
      throw error;
    } finally {
      state.isLoading = false;
    }
  };

  const deleteTask = async (id) => {
    state.isLoading = true;
    state.error = null;
    try {
      await TaskService.deleteTask(id);
      state.tasks = state.tasks.filter(t => t.id !== id);
      if (state.currentTask?.id === id) state.currentTask = null;
    } catch (error) {
      state.error = error.message;
      throw error;
    } finally {
      state.isLoading = false;
    }
  };

  const updateTaskStatus = async (id, status) => {
    state.isLoading = true;
    state.error = null;
    try {
      const taskToUpdate = state.tasks.find(t => t.id === id);
      if (!taskToUpdate) throw new Error('Task not found');

      const updatedTask = await TaskService.updateTask(id, {
        ...taskToUpdate,
        status: status
      });

      const index = state.tasks.findIndex(t => t.id === id);
      if (index !== -1) state.tasks[index] = updatedTask;
      if (state.currentTask?.id === id) state.currentTask = updatedTask;

      return updatedTask;
    } catch (error) {
      state.error = error.message;
      throw error;
    } finally {
      state.isLoading = false;
    }
  };

  // Filtros computados
  const pendingTasks = computed(() => 
    state.tasks.filter(task => task.status === 'pending')
  );

  const inProgressTasks = computed(() => 
    state.tasks.filter(task => task.status === 'in-progress')
  );

  const completedTasks = computed(() => 
    state.tasks.filter(task => task.status === 'completed')
  );

  const highPriorityTasks = computed(() => 
    state.tasks.filter(task => task.priority === 'high')
  );

  const tasksByProject = (projectId) => computed(() =>
    state.tasks.filter(task => task.project_id == projectId)
  );

  return {
    // State
    tasks: computed(() => state.tasks),
    currentTask: computed(() => state.currentTask),
    isLoading: computed(() => state.isLoading),
    error: computed(() => state.error),
    
    // Computed filters
    pendingTasks,
    inProgressTasks,
    completedTasks,
    highPriorityTasks,
    tasksByProject,
    
    // Actions
    fetchTasks,
    fetchTask,
    createTask,
    updateTask,
    deleteTask,
    updateTaskStatus
  };
}