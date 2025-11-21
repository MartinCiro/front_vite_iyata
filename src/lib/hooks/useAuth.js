import { computed } from 'vue';
import { useAuthStore } from '../stores/auth.js';

export function useAuth() {
  const authStore = useAuthStore();

  return {
    // State
    user: computed(() => authStore.user),
    isLoading: computed(() => authStore.isLoading),
    error: computed(() => authStore.error),
    
    // Getters
    isAuthenticated: computed(() => authStore.isAuthenticated),
    
    // Actions
    login: authStore.login,
    register: authStore.register,
    logout: authStore.logout,
    fetchCurrentUser: authStore.fetchCurrentUser,
    clearError: authStore.clearError,
  };
}