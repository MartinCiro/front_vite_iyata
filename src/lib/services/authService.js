import api from './api';

class AuthService {
  // Claves fijas para localStorage - simples y consistentes
  static TOKEN_KEY = 'auth_token';
  static USER_KEY = 'user_data';
  static CURRENT_USER_ID_KEY = 'current_user_id';

  async login(credentials) {
    try {
      const response = await api.post('/login', {
        email: credentials.email,
        password: credentials.password
      });

      let userData = null;
      if (response.data.token) {
        // Obtener datos reales del usuario
        userData = await this.getUserByEmail(credentials.email);

        localStorage.setItem(AuthService.TOKEN_KEY, response.data.token);
        localStorage.setItem(AuthService.USER_KEY, JSON.stringify(userData));
        localStorage.setItem(AuthService.CURRENT_USER_ID_KEY, userData.id.toString());

        window.location.href = '/dashboard';
      }
      
      return {
        token: response.data.token,
        user: userData
      };
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getUserByEmail(email) {
    try {
      const usersResponse = await api.get('/users');
      
      // Buscar usuario por email
      const user = usersResponse.data.data.find(u => u.email === email);
      
      if (!user) throw new Error('Usuario no encontrado');

      // Si encontramos el usuario, obtener sus datos completos
      const userDetailResponse = await api.get(`/users/${user.id}`);
      
      return userDetailResponse.data.data;
      
    } catch (error) {
      // Si hay error específico de "user not found", lanzar mensaje en español
      if (error.message === 'Usuario no encontrado') throw error;
      
      // Para otros errores, usar el manejo estándar
      throw this.handleError(error);
    }
  }

  async register(userData) {
    try {
      const response = await api.post('/register', {
        email: userData.email,
        password: userData.password
      });

      let mockUser = null;
      if (response.data.token) {
        // Para registro, crear usuario mock ya que ReqRes no crea usuarios reales
        mockUser = {
          id: response.data.id || Date.now(), // Usar timestamp como ID único
          email: userData.email,
          first_name: userData.first_name || userData.email.split('@')[0],
          last_name: userData.last_name || 'User',
          avatar: `https://reqres.in/img/faces/${Math.floor(Math.random() * 12) + 1}-image.jpg`,
          is_temporary: true
        };

        localStorage.setItem(AuthService.TOKEN_KEY, response.data.token);
        localStorage.setItem(AuthService.USER_KEY, JSON.stringify(mockUser));
        localStorage.setItem(AuthService.CURRENT_USER_ID_KEY, mockUser.id.toString());
      }
      
      return {
        token: response.data.token,
        user: mockUser,
        message: 'Cuenta de demostración creada exitosamente (los datos no se guardan permanentemente)'
      };
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getCurrentUser() {
    try {
      // Primero intentar obtener del localStorage
      const storedUser = this.getUser();
      if (storedUser) return storedUser;

      // Si no hay usuario en localStorage, intentar con la API
      const currentUserId = this.getCurrentUserId();
      if (!currentUserId) throw new Error('No user ID found');
      
      const response = await api.get(`/users/${currentUserId}`);
      return response.data.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async getUsers(page = 1) {
    try {
      const response = await api.get(`/users?page=${page}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async logout() {
    try {
      // ReqRes no tiene logout, pero intentamos por si acaso
      await api.post('/logout');
    } catch (error) {
      // Esperado - ReqRes no tiene endpoint de logout
      console.log('Logout API call failed (expected)');
    } finally {
      // Limpiar TODOS los datos de autenticación
      this.clearAuthData();
    }
  }

  isAuthenticated() {
    const token = this.getToken();
    const user = this.getUser();
    return !!(token && user);
  }

  getToken = () =>  localStorage.getItem(AuthService.TOKEN_KEY);

  getUser() {
    const user = localStorage.getItem(AuthService.USER_KEY);
    return user ? JSON.parse(user) : null;
  }

  getCurrentUserId = () => localStorage.getItem(AuthService.CURRENT_USER_ID_KEY);

  // Método para verificar si el token actual es válido
  async validateToken() {
    const token = this.getToken();
    if (!token) return false;

    try {
      // Usar un endpoint que siempre funcione para validar el token
      await api.get('/users/1');
      return true;
    } catch (error) {
      return false;
    }
  }

  // Método para limpiar datos corruptos o inconsistentes
  clearAuthData() {
    localStorage.removeItem(AuthService.TOKEN_KEY);
    localStorage.removeItem(AuthService.USER_KEY);
    localStorage.removeItem(AuthService.CURRENT_USER_ID_KEY);

    window.location.href = '/login';
  }

  handleError(error) {
    console.log('AuthService error:', error);
    
    // Manejar errores específicos de ReqRes y traducirlos
    if (error.response?.data?.error) {
      const errorMessage = this.translateReqResError(error.response.data.error);
      return new Error(errorMessage);
    }
    
    if (error.response?.status === 401) this.clearAuthData();
    
    if (error.response?.data) return new Error(error.response.data.message || 'An error occurred');
    
    // Si ya es un error con mensaje en español, mantenerlo
    if (error.message && error.message.includes('no encontrado'))  return error;
    
    return new Error('Error de conexión');
  }

  translateReqResError(error) {
    const errorTranslations = {
      'user not found': 'Usuario no encontrado',
      'Missing password': 'Contraseña requerida',
      'Missing email or username': 'Email requerido',
      'Note: Only defined users succeed registration': 'Solo usuarios predefinidos pueden registrarse. Use: eve.holt@reqres.in',
      'Unknown error': 'Error desconocido'
    };
    
    return errorTranslations[error] || error;
  }
}

export default new AuthService();