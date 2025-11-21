import api from './api.js';

class TaskService {
  async getTasks(projectId = null) {
    const response = await api.get('/comments');
    const tasks = response.data.map(comment => ({
      id: comment.id,
      title: `Task ${comment.id}: ${comment.name || 'Untitled'}`,
      description: comment.body,
      status: ['pending', 'in-progress', 'completed'][comment.id % 3],
      priority: ['low', 'medium', 'high'][comment.id % 3],
      due_date: new Date(Date.now() + comment.id * 86400000).toISOString(),
      project_id: comment.postId,
      assigned_to: `user${comment.id % 10 + 1}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }));

    return projectId ? tasks.filter(task => task.project_id == projectId) : tasks;
  }

  async getTask(id) {
    const response = await api.get(`/comments/${id}`);
    const comment = response.data;
    
    return {
      id: comment.id,
      title: `Task ${comment.id}: ${comment.name || 'Untitled'}`,
      description: comment.body,
      status: ['pending', 'in-progress', 'completed'][comment.id % 3],
      priority: ['low', 'medium', 'high'][comment.id % 3],
      due_date: new Date(Date.now() + comment.id * 86400000).toISOString(),
      project_id: comment.postId,
      assigned_to: `user${comment.id % 10 + 1}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
  }

  async createTask(taskData) {
    const response = await api.post('/comments', {
      name: taskData.title?.replace(`Task ${Date.now()}: `, '') || 'New Task',
      body: taskData.description,
      postId: taskData.project_id,
      email: `user${taskData.assigned_to || 1}@example.com`
    });

    return {
      id: response.data.id,
      ...taskData,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
  }

  async updateTask(id, taskData) {
    const response = await api.put(`/comments/${id}`, {
      name: taskData.title?.replace(`Task ${id}: `, '') || 'Updated Task',
      body: taskData.description,
      postId: taskData.project_id,
      email: `user${taskData.assigned_to || 1}@example.com`
    });

    return {
      id: response.data.id,
      ...taskData,
      updated_at: new Date().toISOString()
    };
  }

  async deleteTask(id) {
    await api.delete(`/comments/${id}`);
    return { success: true };
  }

  // Método adicional para obtener tareas por estado
  async getTasksByStatus(status) {
    const allTasks = await this.getTasks();
    return allTasks.filter(task => task.status === status);
  }
}

export default new TaskService();