<template>
  <div class="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
    <div class="flex justify-between items-start mb-2">
      <h3 class="font-medium text-gray-900">{{ task.title }}</h3>
      <div class="flex space-x-1">
        <router-link :to="`/projects/${projectId}/tasks/${task.id}/edit`" class="text-blue-600 hover:text-blue-800 p-1">
          <PencilSquareIcon class="w-4 h-4" />
        </router-link>
        <button @click="$emit('delete', task.id)" class="text-red-600 hover:text-red-800 p-1">
          <TrashIcon class="w-4 h-4" />
        </button>
      </div>
    </div>
    
    <p class="text-gray-600 text-sm mb-3 line-clamp-2">{{ task.description }}</p>
    
    <div class="flex justify-between items-center text-sm">
      <div class="flex items-center space-x-3">
        <select 
          :value="task.status" 
          @change="$emit('status-change', task.id, ($event.target as HTMLSelectElement).value)"
          class="text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          <option value="todo">To Do</option>
          <option value="in_progress">In Progress</option>
          <option value="done">Done</option>
        </select>
        
        <span v-if="task.due_date" class="text-gray-500">
          Due: {{ formatDate(task.due_date) }}
        </span>
      </div>
      
      <span class="text-gray-400 text-xs">
        {{ formatDate(task.created_at) }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PencilSquareIcon, TrashIcon } from '@heroicons/vue/24/outline'

defineProps<{
  task: any
  projectId: number
}>()

defineEmits<{
  'status-change': [taskId: number, newStatus: string]
  'delete': [taskId: number]
}>()

const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString()

</script>