import api from './api';

class TaskService {
  async getByProject(projectId) {
    try {
      const response = await api.get(`/projects/${projectId}/tasks`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getById(projectId, taskId) {
    try {
      const response = await api.get(`/projects/${projectId}/tasks/${taskId}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async create(projectId, taskData) {
    try {
      const response = await api.post(`/projects/${projectId}/tasks`, taskData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async update(projectId, taskId, taskData) {
    try {
      const response = await api.put(`/projects/${projectId}/tasks/${taskId}`, taskData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async delete(projectId, taskId) {
    try {
      const response = await api.delete(`/projects/${projectId}/tasks/${taskId}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async updateStatus(projectId, taskId, status) {
    try {
      const response = await api.patch(`/projects/${projectId}/tasks/${taskId}/status`, { status });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  handleError(error) {
    if (error.response?.data) {
      return new Error(error.response.data.message || error.response.data.errors?.join(', ') || 'An error occurred');
    }
    return new Error('Network error occurred');
  }
}

export default new TaskService();