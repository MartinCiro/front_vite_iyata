// src/lib/hooks/useProjects.js
import { reactive, computed } from 'vue';
import ProjectService from '../services/projectService.js';

export function useProjects() {
  const state = reactive({
    projects: [],
    currentProject: null,
    isLoading: false,
    error: null
  });

  const fetchProjects = async () => {
    state.isLoading = true;
    state.error = null;
    try {
      state.projects = await ProjectService.getProjects();
    } catch (error) {
      state.error = error.message;
      throw error;
    } finally {
      state.isLoading = false;
    }
  };

  const fetchProject = async (id) => {
    state.isLoading = true;
    state.error = null;
    try {
      state.currentProject = await ProjectService.getProject(id);
    } catch (error) {
      state.error = error.message;
      throw error;
    } finally {
      state.isLoading = false;
    }
  };

  const createProject = async (projectData) => {
    state.isLoading = true;
    state.error = null;
    try {
      const newProject = await ProjectService.createProject(projectData);
      state.projects.push(newProject);
      return newProject;
    } catch (error) {
      state.error = error.message;
      throw error;
    } finally {
      state.isLoading = false;
    }
  };

  const updateProject = async (id, projectData) => {
    state.isLoading = true;
    state.error = null;
    try {
      const updatedProject = await ProjectService.updateProject(id, projectData);
      const index = state.projects.findIndex(p => p.id === id);
      if (index !== -1) state.projects[index] = updatedProject;
      if (state.currentProject?.id === id) state.currentProject = updatedProject;
      
      return updatedProject;
    } catch (error) {
      state.error = error.message;
      throw error;
    } finally {
      state.isLoading = false;
    }
  };

  const deleteProject = async (id) => {
    state.isLoading = true;
    state.error = null;
    try {
      await ProjectService.deleteProject(id);
      state.projects = state.projects.filter(p => p.id !== id);
      if (state.currentProject?.id === id) state.currentProject = null;
    } catch (error) {
      state.error = error.message;
      throw error;
    } finally {
      state.isLoading = false;
    }
  };

  return {
    // State
    projects: computed(() => state.projects),
    currentProject: computed(() => state.currentProject),
    isLoading: computed(() => state.isLoading),
    error: computed(() => state.error),
    
    // Actions
    fetchProjects,
    fetchProject,
    createProject,
    updateProject,
    deleteProject
  };
}