<template>
  <div>
    <div class="mb-6">
      <router-link :to="`/projects/${projectId}`" class="text-blue-600 hover:text-blue-800 flex items-center">
        <ArrowLeftIcon class="w-4 h-4 mr-1" />
        Back to Project
      </router-link>
    </div>

    <div class="flex justify-between items-center mb-6">
      <div>
        <h1 class="text-2xl font-semibold text-gray-900">Tasks</h1>
        <p class="text-gray-600" v-if="project">Project: {{ project.name }}</p>
      </div>
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
import { ArrowLeftIcon, PlusIcon } from '@heroicons/vue/24/outline'
import Button from 'useable/Button.vue'

interface Props {
  projectId: number
  project?: {
    name: string
  } | null
}

defineProps<Props>()
</script>