import axios from 'axios';
import AuthService from './authService';
import config from 'constants/config.js';

// Función para determinar la base URL dinámica
const getBaseURL = (url) => {
  if (url && (url.includes('/login') || url.includes('/register') || url.includes('/users'))) return 'https://reqres.in/api'; // Para autenticación y usuarios
  return 'https://jsonplaceholder.typicode.com'; // Para datos mock (proyectos, tareas, etc.)
};

const api = axios.create({
  // NO usar baseURL fija aquí, se establecerá dinámicamente
  timeout: config.api.timeout,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'x-api-key': config.api.apiKey
  }
});

api.interceptors.request.use(
  (requestConfig) => {
    // Establecer baseURL dinámica basada en la URL
    requestConfig.baseURL = getBaseURL(requestConfig.url);
    
    const token = AuthService.getToken();
    if (token) requestConfig.headers.Authorization = `Bearer ${token}`;
    
    return requestConfig;
  },
  (error) => Promise.reject(error)
);

// Interceptor para manejar errores globalmente
api.interceptors.response.use(
  (response) => response,
  (error) => {
    
    if (error.response?.status === 401) {
      AuthService.clearAuthData();
      if (typeof window !== 'undefined') window.location.href = '/login';
    }
    
    return Promise.reject(error)
  }
);

export default api;