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

        <Loader v-if="isLoading || tasksLoading" text="Loading project..." />
        
        <div v-else-if="project" class="space-y-6">
          <Card>
            <div class="flex justify-between items-start">
              <div>
                <h1 class="text-2xl font-bold text-gray-900">{{ project.title }}</h1> <!-- Cambié name por title -->
                <p class="text-gray-600 mt-2">{{ project.description }}</p>
              </div>
              <span :class="statusBadgeClasses(project.status)" class="px-3 py-1 rounded-full text-sm font-medium">
                {{ getStatusTitle(project.status) }} <!-- Mostrar título legible -->
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
              <div class="flex justify-between items-center">
                <h2 class="text-lg font-medium text-gray-900">Recent Tasks</h2>
                <span class="text-sm text-gray-500">{{ tasks.length }} tasks</span>
              </div>
            </template>
            
            <div v-if="tasks.length > 0" class="space-y-3">
              <div 
                v-for="task in tasks.slice(0, 5)" 
                :key="task.id" 
                class="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                @click="$router.push(`/projects/${project.id}/tasks`)"
              >
                <div class="flex-1">
                  <h3 class="font-medium text-gray-900">{{ task.title }}</h3>
                  <p class="text-sm text-gray-600 mt-1 line-clamp-2">{{ task.description }}</p>
                  <div class="flex items-center mt-2 text-xs text-gray-500">
                    <span>Due: {{ formatDate(task.due_date) }}</span>
                    <span class="mx-2">•</span>
                    <span>Priority: {{ task.priority }}</span>
                  </div>
                </div>
                <span :class="taskStatusBadgeClasses(task.status)" class="px-2 py-1 text-xs rounded-full font-medium ml-4">
                  {{ getTaskStatusTitle(task.status) }}
                </span>
              </div>
              
              <div v-if="tasks.length > 5" class="text-center pt-4">
                <router-link 
                  :to="`/projects/${project.id}/tasks`" 
                  class="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  View all {{ tasks.length }} tasks
                </router-link>
              </div>
            </div>
            
            <div v-else class="text-center py-8 text-gray-500">
              <DocumentTextIcon class="mx-auto h-12 w-12 text-gray-400" />
              <p class="mt-2">No tasks yet</p>
              <router-link 
                :to="`/projects/${project.id}/tasks/create`" 
                class="text-blue-600 hover:text-blue-800 mt-2 inline-block font-medium"
              >
                Create your first task
              </router-link>
            </div>
          </Card>
        </div>
        
        <div v-else-if="!isLoading" class="text-center py-12">
          <p class="text-gray-500">Project not found</p>
          <router-link to="/projects" class="text-blue-600 hover:text-blue-800 mt-2 inline-block">
            Back to Projects
          </router-link>
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { ArrowLeftIcon, DocumentTextIcon } from '@heroicons/vue/24/outline'
import AppLayout from 'layouts/AppLayout.vue'
import Card from 'useable/Card.vue'
import Button from 'useable/Button.vue'
import Loader from 'useable/Loader.vue'
import { useProjects } from 'hooks/useProjects'
import { useTasks } from 'hooks/useTasks' 

const route = useRoute()
const projectId = Number(route.params.id)

const { fetchProject, isLoading, currentProject: project } = useProjects()
const { fetchTasks, tasks, isLoading: tasksLoading, tasksByProject } = useTasks()


const projectTasks = computed(() => tasksByProject(projectId).value)

const statusBadgeClasses = (status: string) => {
  const classes = {
    pending: 'bg-yellow-100 text-yellow-800',
    in_progress: 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800',
    active: 'bg-green-100 text-green-800'
  }
  return classes[status as keyof typeof classes] || 'bg-gray-100 text-gray-800'
}

const taskStatusBadgeClasses = (status: string) => {
  const classes = {
    todo: 'bg-gray-100 text-gray-800',
    in_progress: 'bg-blue-100 text-blue-800',
    done: 'bg-green-100 text-green-800',
    pending: 'bg-yellow-100 text-yellow-800'
  }
  return classes[status as keyof typeof classes] || 'bg-gray-100 text-gray-800'
}

const getStatusTitle = (status: string) => {
  const titles = {
    pending: 'Pending',
    in_progress: 'In Progress',
    completed: 'Completed',
    active: 'Active'
  }
  return titles[status as keyof typeof titles] || status
}

const getTaskStatusTitle = (status: string) => {
  const titles = {
    todo: 'To Do',
    in_progress: 'In Progress',
    done: 'Done',
    pending: 'Pending'
  }
  return titles[status as keyof typeof titles] || status
}

const formatDate = (dateString: string) => {
  if (!dateString) return 'No date'
  return new Date(dateString).toLocaleDateString()
}

onMounted(async () => {
  await fetchProject(projectId)
  await fetchTasks(projectId)
})
</script>