import { defineStore } from 'pinia';
import ProjectService from '../services/projectService';

export const useProjectStore = defineStore('projects', {
  state: () => ({
    projects: [],
    currentProject: null,
    isLoading: false,
    error: null,
  }),

  getters: {
    allProjects: (state) => state.projects,
    activeProjects: (state) => state.projects.filter(p => p.status !== 'completed'),
    completedProjects: (state) => state.projects.filter(p => p.status === 'completed'),
  },

  actions: {
    async fetchProjects() {
      this.isLoading = true;
      this.error = null;
      
      try {
        const response = await ProjectService.getAll();
        this.projects = response.data;
      } catch (error) {
        this.error = error.message;
        throw error;
      } finally {
        this.isLoading = false;
      }
    },

    async fetchProject(id) {
      this.isLoading = true;
      this.error = null;
      
      try {
        const response = await ProjectService.getById(id);
        this.currentProject = response.data;
        return response.data;
      } catch (error) {
        this.error = error.message;
        throw error;
      } finally {
        this.isLoading = false;
      }
    },

    async createProject(projectData) {
      this.isLoading = true;
      this.error = null;
      
      try {
        const response = await ProjectService.create(projectData);
        this.projects.push(response.data);
        return response.data;
      } catch (error) {
        this.error = error.message;
        throw error;
      } finally {
        this.isLoading = false;
      }
    },

    async updateProject(id, projectData) {
      this.isLoading = true;
      this.error = null;
      
      try {
        const response = await ProjectService.update(id, projectData);
        const index = this.projects.findIndex(p => p.id === id);
        if (index !== -1) this.projects[index] = response.data;
        if (this.currentProject?.id === id) this.currentProject = response.data;
        return response.data;
      } catch (error) {
        this.error = error.message;
        throw error;
      } finally {
        this.isLoading = false;
      }
    },

    async deleteProject(id) {
      this.isLoading = true;
      this.error = null;
      
      try {
        await ProjectService.delete(id);
        this.projects = this.projects.filter(p => p.id !== id);
        if (this.currentProject?.id === id) this.currentProject = null;
      } catch (error) {
        this.error = error.message;
        throw error;
      } finally {
        this.isLoading = false;
      }
    },

    async updateProjectStatus(id, status) {
      this.isLoading = true;
      this.error = null;
      
      try {
        const response = await ProjectService.updateStatus(id, status);
        const index = this.projects.findIndex(p => p.id === id);
        if (index !== -1) this.projects[index] = response.data;
        if (this.currentProject?.id === id) this.currentProject = response.data;
        return response.data;
      } catch (error) {
        this.error = error.message;
        throw error;
      } finally {
        this.isLoading = false;
      }
    },

    clearCurrentProject() {
      this.currentProject = null;
    },

    clearError() {
      this.error = null;
    },
  },
});