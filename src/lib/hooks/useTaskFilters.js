import { computed, ref } from 'vue'

export function useTaskFilters(tasks) {
  const statusFilter = ref('all')

  const filteredTasks = computed(() => {
    let filtered = tasks.value
    
    if (statusFilter.value !== 'all') filtered = filtered.filter(task => task.status === statusFilter.value)
    
    return {
      todo: filtered.filter(task => task.status === 'todo'),
      in_progress: filtered.filter(task => task.status === 'in_progress'),
      done: filtered.filter(task => task.status === 'done')
    }
  })

  return {
    statusFilter,
    filteredTasks
  }
}