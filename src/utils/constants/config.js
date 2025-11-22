export default {
  // API
  api: {
    baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
    timeout: parseInt(import.meta.env.VITE_API_TIMEOUT) || 10000,
    apiKey: import.meta.env.VITE_API_KEY || 'reqres-free-v1',
    limit: parseInt(import.meta.env.VITE_LIMIT_PROJECTS) || 10,
  },

  jsonPlaceholder: {
    baseUrl: 'https://jsonplaceholder.typicode.com'
  },
  
  // App
  app: {
    name: import.meta.env.VITE_APP_NAME || 'Iyata App',
    env: import.meta.env.VITE_ENV || 'development',
    version: import.meta.env.VITE_APP_VERSION || '1.0.0',
  },
  
  // Features
  features: {
    enableDebug: import.meta.env.VITE_ENABLE_DEBUG === 'true',
    enableAnalytics: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
  },
  
  // Storage
  storage: {
    userKey: import.meta.env.VITE_USER_KEY || 'user',
  }
};