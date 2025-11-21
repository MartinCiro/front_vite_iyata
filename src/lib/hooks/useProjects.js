import { computed } from 'vue';
import { useProjectStore } from '../stores/projects.js';

export function useProjects() {
  const projectStore = useProjectStore();

  return {
    // State
    projects: computed(() => projectStore.projects),
    currentProject: computed(() => projectStore.currentProject),
    isLoading: computed(() => projectStore.isLoading),
    error: computed(() => projectStore.error),
    
    // Getters
    allProjects: computed(() => projectStore.allProjects),
    activeProjects: computed(() => projectStore.activeProjects),
    completedProjects: computed(() => projectStore.completedProjects),
    
    // Actions
    fetchProjects: projectStore.fetchProjects,
    fetchProject: projectStore.fetchProject,
    createProject: projectStore.createProject,
    updateProject: projectStore.updateProject,
    deleteProject: projectStore.deleteProject,
    updateProjectStatus: projectStore.updateProjectStatus,
    clearCurrentProject: projectStore.clearCurrentProject,
    clearError: projectStore.clearError,
  };
}