import api from './api.js';

class ProjectService {
  async getProjects() {
    const response = await api.get('/posts');
    return response.data.map(post => ({
      id: post.id,
      title: post.title,
      description: post.body,
      status: 'active',
      created_at: new Date().toISOString(),
      user_id: post.userId
    }));
  }

  async getProject(id) {
    const response = await api.get(`/posts/${id}`);
    const post = response.data;
    return {
      id: post.id,
      title: post.title,
      description: post.body,
      status: 'active',
      created_at: new Date().toISOString(),
      user_id: post.userId
    };
  }

  async createProject(projectData) {
    const response = await api.post('/posts', {
      title: projectData.title,
      body: projectData.description,
      userId: 1 
    });
    
    return {
      id: response.data.id,
      ...projectData,
      created_at: new Date().toISOString()
    };
  }

  async updateProject(id, projectData) {
    const response = await api.put(`/posts/${id}`, {
      title: projectData.title,
      body: projectData.description,
      userId: 1
    });
    
    return {
      id: response.data.id,
      ...projectData
    };
  }

  async deleteProject(id) {
    await api.delete(`/posts/${id}`);
    return { success: true };
  }

  async getProjectUsers() {
    const response = await api.get('/users');
    return response.data.slice(0, 3); // Limitar a 3 usuarios
  }
}

export default new ProjectService();