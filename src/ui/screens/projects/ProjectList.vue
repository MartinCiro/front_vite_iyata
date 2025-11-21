<template>
  <AppLayout>
    <div class="py-6">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center mb-6">
          <h1 class="text-2xl font-semibold text-gray-900">Projects</h1>
          <router-link to="/projects/create">
            <Button variant="primary">
              <PlusIcon class="w-4 h-4 mr-2" />
              New Project
            </Button>
          </router-link>
        </div>

        <Loader v-if="isLoading" text="Loading projects..." />
        
        <div v-else class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card 
            v-for="project in projects" 
            :key="project.id"
            class="hover:shadow-md transition-shadow cursor-pointer"
            @click="$router.push(`/projects/${project.id}`)"
          >
            <div class="flex justify-between items-start mb-2">
              <h3 class="text-lg font-medium text-gray-900">{{ project.name }}</h3>
              <span :class="statusBadgeClasses(project.status)" class="px-2 py-1 text-xs rounded-full">
                {{ project.status }}
              </span>
            </div>
            <p class="text-gray-600 text-sm mb-4 line-clamp-2">{{ project.description }}</p>
            <div class="flex justify-between items-center text-sm text-gray-500">
              <span>{{ formatDate(project.created_at) }}</span>
              <div class="flex space-x-2">
                <button @click.stop="$router.push(`/projects/${project.id}/edit`)" class="text-blue-600 hover:text-blue-800">
                  Edit
                </button>
                <button @click.stop="deleteProject(project.id)" class="text-red-600 hover:text-red-800">
                  Delete
                </button>
              </div>
            </div>
          </Card>
        </div>

        <div v-if="!isLoading && projects.length === 0" class="text-center py-12">
          <DocumentTextIcon class="mx-auto h-12 w-12 text-gray-400" />
          <h3 class="mt-2 text-sm font-medium text-gray-900">No projects</h3>
          <p class="mt-1 text-sm text-gray-500">Get started by creating a new project.</p>
          <div class="mt-6">
            <router-link to="/projects/create">
              <Button variant="primary">
                <PlusIcon class="w-4 h-4 mr-2" />
                New Project
              </Button>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { PlusIcon, DocumentTextIcon } from '@heroicons/vue/24/outline'
import AppLayout from '../../../lib/layouts/AppLayout.vue'
import Card from '../../../ui/useable-components/Card.vue'
import Button from '../../../ui/useable-components/Button.vue'
import Loader from '../../../ui/useable-components/Loader.vue'
import { useProjects } from '../../../lib/hooks/useProjects'

const { projects, isLoading, fetchProjects, deleteProject } = useProjects()

const statusBadgeClasses = (status: string) => {
  const classes = {
    pending: 'bg-yellow-100 text-yellow-800',
    in_progress: 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800'
  }
  return classes[status as keyof typeof classes] || 'bg-gray-100 text-gray-800'
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString()
}

onMounted(() => {
  fetchProjects()
})
</script>