// src/lib/services/projectService.js (ejemplo actualizado)
import api from './api';
import { API_ENDPOINTS } from 'constants/api.js';

class ProjectService {
  async getAll() {
    try {
      const response = await api.get(API_ENDPOINTS.PROJECTS.BASE);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getById(id) {
    try {
      const response = await api.get(API_ENDPOINTS.PROJECTS.BY_ID(id));
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async create(projectData) {
    try {
      const response = await api.post(API_ENDPOINTS.PROJECTS.BASE, projectData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

}

export default new ProjectService(); 