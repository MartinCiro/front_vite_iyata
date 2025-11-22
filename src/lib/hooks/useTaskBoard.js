import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useTasks } from 'hooks/useTasks'
import { useProjects } from 'hooks/useProjects'

export function useTaskBoard() {
  const route = useRoute()
  const projectId = Number(route.params.projectId)
  const statusFilter = ref('all')

  const { tasks, isLoading, fetchTasks, updateTaskStatus, deleteTask } = useTasks()
  const { fetchProject, currentProject: project } = useProjects()

  // Asegurarnos de que tasks siempre sea un array
  const safeTasks = computed(() => tasks.value || [])

  const filteredTasks = computed(() => {
    let filtered = safeTasks.value // Usar safeTasks en lugar de tasks.value
    
    if (statusFilter.value !== 'all') {
      filtered = filtered.filter(task => task.status === statusFilter.value)
    }
    
    return {
      todo: filtered.filter(task => task.status === 'todo'),
      in_progress: filtered.filter(task => task.status === 'in_progress'),
      done: filtered.filter(task => task.status === 'done')
    }
  })

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      await updateTaskStatus(taskId, newStatus)
    } catch (error) {
      console.error('Error updating task status:', error)
      throw error
    }
  }

  const handleDeleteTask = async (taskId) => {
    if (confirm('Are you sure you want to delete this task?')) {
      try {
        await deleteTask(taskId)
      } catch (error) {
        console.error('Error deleting task:', error)
        throw error
      }
    }
  }

  const initialize = async () => {
    await fetchProject(projectId)
    await fetchTasks(projectId)
  }

  return {
    projectId,
    project,
    statusFilter,
    filteredTasks,
    isLoading,
    tasks: safeTasks, // Exportar safeTasks en lugar de tasks
    handleStatusChange,
    handleDeleteTask,
    initialize
  }
}