import config from './config.js';

export const API_ENDPOINTS = {
  // Auth
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    USER: '/user',
  },
  
  // Projects
  PROJECTS: {
    BASE: '/projects',
    BY_ID: (id) => `/projects/${id}`,
    STATUS: (id) => `/projects/${id}/status`,
  },
  
  // Tasks
  TASKS: {
    BY_PROJECT: (projectId) => `/projects/${projectId}/tasks`,
    BY_ID: (projectId, taskId) => `/projects/${projectId}/tasks/${taskId}`,
    STATUS: (projectId, taskId) => `/projects/${projectId}/tasks/${taskId}/status`,
  },
};

export const API_URLS = {
  FULL: {
    LOGIN: `${config.api.baseUrl}${API_ENDPOINTS.AUTH.LOGIN}`,
    REGISTER: `${config.api.baseUrl}${API_ENDPOINTS.AUTH.REGISTER}`,
    // ... otros endpoints completos si los necesitas
  }
};