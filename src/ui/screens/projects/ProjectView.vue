<template>
  <AppLayout>
    <div class="py-6">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="mb-6 flex justify-between items-center">
          <router-link to="/projects" class="text-blue-600 hover:text-blue-800 flex items-center">
            <ArrowLeftIcon class="w-4 h-4 mr-1" />
            Back to Projects
          </router-link>
          <div class="flex space-x-3">
            <router-link :to="`/projects/${project?.id}/edit`">
              <Button variant="outline">
                Edit Project
              </Button>
            </router-link>
            <router-link :to="`/projects/${project?.id}/tasks`">
              <Button variant="primary">
                View Tasks
              </Button>
            </router-link>
          </div>
        </div>

        <Loader v-if="isLoading" text="Loading project..." />
        
        <div v-else-if="project" class="space-y-6">
          <Card>
            <div class="flex justify-between items-start">
              <div>
                <h1 class="text-2xl font-bold text-gray-900">{{ project.name }}</h1>
                <p class="text-gray-600 mt-2">{{ project.description }}</p>
              </div>
              <span :class="statusBadgeClasses(project.status)" class="px-3 py-1 rounded-full text-sm font-medium">
                {{ project.status }}
              </span>
            </div>
            
            <div class="mt-6 grid grid-cols-2 gap-4 text-sm text-gray-600">
              <div>
                <span class="font-medium">Created:</span>
                <span class="ml-2">{{ formatDate(project.created_at) }}</span>
              </div>
              <div>
                <span class="font-medium">Last Updated:</span>
                <span class="ml-2">{{ formatDate(project.updated_at) }}</span>
              </div>
            </div>
          </Card>

          <!-- Tasks Preview -->
          <Card>
            <template #header>
              <h2 class="text-lg font-medium text-gray-900">Recent Tasks</h2>
            </template>
            <div v-if="tasks.length > 0" class="space-y-3">
              <div v-for="task in tasks.slice(0, 5)" :key="task.id" class="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div>
                  <h3 class="font-medium text-gray-900">{{ task.title }}</h3>
                  <p class="text-sm text-gray-600">{{ task.description }}</p>
                </div>
                <span :class="taskStatusBadgeClasses(task.status)" class="px-2 py-1 text-xs rounded-full">
                  {{ task.status }}
                </span>
              </div>
            </div>
            <div v-else class="text-center py-8 text-gray-500">
              <p>No tasks yet</p>
              <router-link :to="`/projects/${project.id}/tasks/create`" class="text-blue-600 hover:text-blue-800 mt-2 inline-block">
                Create your first task
              </router-link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { ArrowLeftIcon } from '@heroicons/vue/24/outline'
import AppLayout from 'layouts/AppLayout.vue'
import Card from 'useable/Card.vue'
import Button from 'useable/Button.vue'
import Loader from 'useable/Loader.vue'
import { useProjects } from 'hooks/useProjects'

const route = useRoute()
const { fetchProject, isLoading, currentProject } = useProjects()
const tasks = ref([]) // En una implementación real, cargarías las tareas del proyecto

const project = currentProject

const statusBadgeClasses = (status: string) => {
  const classes = {
    pending: 'bg-yellow-100 text-yellow-800',
    in_progress: 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800'
  }
  return classes[status as keyof typeof classes] || 'bg-gray-100 text-gray-800'
}

const taskStatusBadgeClasses = (status: string) => {
  const classes = {
    todo: 'bg-gray-100 text-gray-800',
    in_progress: 'bg-blue-100 text-blue-800',
    done: 'bg-green-100 text-green-800'
  }
  return classes[status as keyof typeof classes] || 'bg-gray-100 text-gray-800'
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString()
}

onMounted(async () => {
  await fetchProject(Number(route.params.id))
})
</script>