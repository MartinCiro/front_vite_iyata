<template>
  <div :class="columnClass" class="rounded-lg p-4">
    <h3 class="text-lg font-medium text-gray-900 mb-4 flex items-center">
      <span :class="dotClass" class="w-3 h-3 rounded-full mr-2"></span>
      {{ title }} ({{ tasks.length }})
    </h3>
    <div class="space-y-3">
      <TaskCard 
        v-for="task in tasks" 
        :key="task.id"
        :task="task"
        :project-id="projectId"
        @status-change="$emit('status-change', $event)"
        @delete="$emit('delete', $event)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import TaskCard from 'components/Task/TaskCard.vue'

interface Props {
  title: string
  tasks: any[]
  projectId: number
  type: 'todo' | 'in_progress' | 'done'
}

defineProps<Props>()
defineEmits<{
  'status-change': [taskId: number, newStatus: string]
  'delete': [taskId: number]
}>()

const columnStyles = {
  todo: 'bg-gray-50',
  in_progress: 'bg-blue-50',
  done: 'bg-green-50'
}

const dotStyles = {
  todo: 'bg-gray-400',
  in_progress: 'bg-blue-500',
  done: 'bg-green-500'
}

const columnClass = computed(() => columnStyles[props.type])
const dotClass = computed(() => dotStyles[props.type])
</script>