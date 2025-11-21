import { defineStore } from 'pinia';
import AuthService from '../services/authService';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: AuthService.getUser(),
    token: AuthService.getToken(),
    isLoading: false,
    error: null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
    currentUser: (state) => state.user,
  },

  actions: {
    async login(credentials) {
      this.isLoading = true;
      this.error = null;
      
      try {
        const response = await AuthService.login(credentials);
        this.user = response.user;
        this.token = response.token;
        return response;
      } catch (error) {
        this.error = error.message;
        throw error;
      } finally {
        this.isLoading = false;
      }
    },

    async register(userData) {
      this.isLoading = true;
      this.error = null;
      
      try {
        const response = await AuthService.register(userData);
        return response;
      } catch (error) {
        this.error = error.message;
        throw error;
      } finally {
        this.isLoading = false;
      }
    },

    async logout() {
      this.isLoading = true;
      
      try {
        await AuthService.logout();
        this.$reset();
      } catch (error) {
        console.error('Logout error:', error);
      } finally {
        this.isLoading = false;
      }
    },

    async fetchCurrentUser() {
      if (!this.token) return;
      
      this.isLoading = true;
      
      try {
        const response = await AuthService.getCurrentUser();
        this.user = response.user;
      } catch (error) {
        console.error('Fetch user error:', error);
        this.logout();
      } finally {
        this.isLoading = false;
      }
    },

    clearError() {
      this.error = null;
    },
  },
});