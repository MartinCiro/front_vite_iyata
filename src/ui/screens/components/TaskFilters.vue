<template>
  <div class="flex flex-wrap gap-4 items-center">
    <label class="flex items-center">
      <span class="mr-2 text-sm text-gray-700">Status:</span>
      <select 
        :value="modelValue" 
        @change="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
        class="rounded-md border border-gray-300 px-3 py-1 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
      >
        <option value="all">All</option>
        <option value="todo">To Do</option>
        <option value="in_progress">In Progress</option>
        <option value="done">Done</option>
      </select>
    </label>
    
    <!-- Se pueden agregar más filtros aquí en el futuro -->
    <slot name="additional-filters"></slot>
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue: string
}

interface Emits {
  (e: 'update:modelValue', value: string): void
}

defineProps<Props>()
defineEmits<Emits>()
</script>