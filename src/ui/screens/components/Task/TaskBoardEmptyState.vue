<template>
  <div class="text-center py-12">
    <ClipboardDocumentListIcon class="mx-auto h-12 w-12 text-gray-400" />
    <h3 class="mt-2 text-sm font-medium text-gray-900">No tasks</h3>
    <p class="mt-1 text-sm text-gray-500">Get started by creating your first task.</p>
    <div class="mt-6">
      <router-link :to="`/projects/${projectId}/tasks/create`">
        <Button variant="primary">
          <PlusIcon class="w-4 h-4 mr-2" />
          New Task
        </Button>
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ClipboardDocumentListIcon, PlusIcon } from '@heroicons/vue/24/outline'
import Button from 'useable/Button.vue'

interface Props {
  projectId: number
}

defineProps<Props>()
</script>