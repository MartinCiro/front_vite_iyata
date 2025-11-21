import { reactive, computed } from 'vue';
import AuthService from '../services/authService.js';

export function useAuth() {
  const state = reactive({
    user: AuthService.getUser(),
    isLoading: false,
    error: null
  });

  const login = async (credentials) => {
    state.isLoading = true;
    state.error = null;
    
    try {
      const data = await AuthService.login(credentials);
      state.user = data.user;
      return data;
    } catch (error) {
      state.error = error.message;
      throw error;
    } finally {
      state.isLoading = false;
    }
  };

  const register = async (userData) => {
    state.isLoading = true;
    state.error = null;
    
    try {
      const data = await AuthService.register(userData);
      state.user = data.user;
      return data;
    } catch (error) {
      state.error = error.message;
      throw error;
    } finally {
      state.isLoading = false;
    }
  };

  const logout = async () => {
    state.isLoading = true;
    try {
      await AuthService.logout();
      state.user = null;
      state.error = null;
    } catch (error) {
      state.error = error.message;
      throw error;
    } finally {
      state.isLoading = false;
    }
  };

  const fetchCurrentUser = async () => {
    state.isLoading = true;
    try {
      const user = await AuthService.getCurrentUser();
      state.user = user;
      return user;
    } catch (error) {
      state.error = error.message;
      throw error;
    } finally {
      state.isLoading = false;
    }
  };

  const clearError = () => {
    state.error = null;
  };

  const refreshUser = async () => {
    try {
      const user = await AuthService.getCurrentUser();
      state.user = user;
    } catch (error) {
      console.error('Error refreshing user:', error);
    }
  };

  return {
    // State
    user: computed(() => state.user),
    isLoading: computed(() => state.isLoading),
    error: computed(() => state.error),
    
    // Getters
    isAuthenticated: computed(() => AuthService.isAuthenticated()),
    
    // Actions
    login,
    register,
    logout,
    fetchCurrentUser,
    clearError,
    refreshUser
  };
}