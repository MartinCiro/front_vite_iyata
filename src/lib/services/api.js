import axios from 'axios';
import AuthService from './authService';
import config from 'constants/config.js';

const api = axios.create({
  baseURL: config.api.baseUrl,
  timeout: config.api.timeout,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'x-api-key': config.api.apiKey
  }
});

api.interceptors.request.use(
  (config) => {
    const token = AuthService.getToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;    
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Interceptor para manejar errores globalmente
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      AuthService.clearAuthData();
      if (typeof window !== 'undefined') window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;