import { ref } from 'vue';

export function useApi() {
  const data = ref(null);
  const loading = ref(false);
  const error = ref(null);

  const execute = async (apiCall, ...args) => {
    loading.value = true;
    error.value = null;
    
    try {
      const result = await apiCall(...args);
      data.value = result;
      return result;
    } catch (err) {
      error.value = err.message;
      console.error('API Error:', err);
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const reset = () => {
    data.value = null;
    loading.value = false;
    error.value = null;
  };

  return {
    data,
    loading,
    error,
    execute,
    reset,
  };
}