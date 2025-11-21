import api from './api';

class AuthService {
  // Claves fijas para localStorage - simples y consistentes
  static TOKEN_KEY = 'auth_token';
  static USER_KEY = 'user_data';
  static CURRENT_USER_ID_KEY = 'current_user_id';

  async login(credentials) {
    try {
      const response = await api.post('/auth/login', credentials);      
      if (response.data.token && response.data.user) {
        // Guardar token y datos del usuario
        localStorage.setItem(AuthService.TOKEN_KEY, response.data.token);
        localStorage.setItem(AuthService.USER_KEY, JSON.stringify(response.data.user));
        localStorage.setItem(AuthService.CURRENT_USER_ID_KEY, response.data.user.id.toString());
        
        console.log('Authentication data stored successfully');
        console.log('User ID:', response.data.user.id);
      }
      
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async register(userData) {
    try {
      const response = await api.post('/auth/register', userData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async logout() {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Limpiar TODOS los datos de autenticación
      localStorage.removeItem(AuthService.TOKEN_KEY);
      localStorage.removeItem(AuthService.USER_KEY);
      localStorage.removeItem(AuthService.CURRENT_USER_ID_KEY);
      console.log('User logged out - all auth data cleared');
    }
  }

  async getCurrentUser() {
    try {
      const response = await api.get('/user');
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  isAuthenticated() {
    const token = this.getToken();
    const user = this.getUser();
    return !!(token && user);
  }

  getToken() {
    return localStorage.getItem(AuthService.TOKEN_KEY);
  }

  getUser() {
    const user = localStorage.getItem(AuthService.USER_KEY);
    return user ? JSON.parse(user) : null;
  }

  getCurrentUserId() {
    return localStorage.getItem(AuthService.CURRENT_USER_ID_KEY);
  }

  // Método para verificar si el token actual es válido
  async validateToken() {
    const token = this.getToken();
    if (!token) return false;

    try {
      const response = await api.get('/auth/validate', {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data.valid || true;
    } catch (error) {
      return false;
    }
  }

  // Método para limpiar datos corruptos o inconsistentes
  clearAuthData() {
    localStorage.removeItem(AuthService.TOKEN_KEY);
    localStorage.removeItem(AuthService.USER_KEY);
    localStorage.removeItem(AuthService.CURRENT_USER_ID_KEY);
    console.log('Auth data cleared');
  }

  handleError(error) {
    console.log('AuthService error:', error);
    
    // Si es error de autenticación, limpiar datos
    if (error.response?.status === 401) {
      this.clearAuthData();
    }
    
    if (error.response?.data) {
      return new Error(error.response.data.message || 'An error occurred');
    }
    return new Error('Network error occurred');
  }
}

export default new AuthService();