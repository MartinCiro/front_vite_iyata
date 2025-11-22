<template>
  <AppLayout>
    <div class="py-6">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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

        <!-- Filters -->
        <Card class="mb-6">
          <div class="flex flex-wrap gap-4 items-center">
            <label class="flex items-center">
              <span class="mr-2 text-sm text-gray-700">Status:</span>
              <select v-model="statusFilter" class="rounded-md border border-gray-300 px-3 py-1 text-sm">
                <option value="all">All</option>
                <option value="todo">To Do</option>
                <option value="in_progress">In Progress</option>
                <option value="done">Done</option>
              </select>
            </label>
          </div>
        </Card>

        <Loader v-if="isLoading" text="Loading tasks..." />
        
        <div v-else class="space-y-4">
          <!-- Todo Column -->
          <div v-if="filteredTasks.todo.length > 0" class="bg-gray-50 rounded-lg p-4">
            <h3 class="text-lg font-medium text-gray-900 mb-4 flex items-center">
              <span class="w-3 h-3 bg-gray-400 rounded-full mr-2"></span>
              To Do ({{ filteredTasks.todo.length }})
            </h3>
            <div class="space-y-3">
              <TaskCard 
                v-for="task in filteredTasks.todo" 
                :key="task.id"
                :task="task"
                :project-id="projectId"
                @status-change="handleStatusChange"
                @delete="handleDeleteTask"
              />
            </div>
          </div>

          <!-- In Progress Column -->
          <div v-if="filteredTasks.in_progress.length > 0" class="bg-blue-50 rounded-lg p-4">
            <h3 class="text-lg font-medium text-gray-900 mb-4 flex items-center">
              <span class="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
              In Progress ({{ filteredTasks.in_progress.length }})
            </h3>
            <div class="space-y-3">
              <TaskCard 
                v-for="task in filteredTasks.in_progress" 
                :key="task.id"
                :task="task"
                :project-id="projectId"
                @status-change="handleStatusChange"
                @delete="handleDeleteTask"
              />
            </div>
          </div>

          <!-- Done Column -->
          <div v-if="filteredTasks.done.length > 0" class="bg-green-50 rounded-lg p-4">
            <h3 class="text-lg font-medium text-gray-900 mb-4 flex items-center">
              <span class="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
              Done ({{ filteredTasks.done.length }})
            </h3>
            <div class="space-y-3">
              <TaskCard 
                v-for="task in filteredTasks.done" 
                :key="task.id"
                :task="task"
                :project-id="projectId"
                @status-change="handleStatusChange"
                @delete="handleDeleteTask"
              />
            </div>
          </div>

          <!-- Empty State -->
          <div v-if="!isLoading && tasks.length === 0" class="text-center py-12">
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
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { ArrowLeftIcon, PlusIcon, ClipboardDocumentListIcon } from '@heroicons/vue/24/outline'
import AppLayout from 'layouts/AppLayout.vue'
import Card from 'useable/Card.vue'
import Button from 'useable/Button.vue'
import Loader from 'useable/Loader.vue'
import TaskCard from '../components/TaskCard.vue'
import { useTasks } from 'hooks/useTasks'
import { useProjects } from 'hooks/useProjects'

const route = useRoute()
const projectId = Number(route.params.projectId)
const statusFilter = ref('all')

const { tasks, isLoading, fetchTasks, updateTaskStatus, deleteTask } = useTasks()
const { fetchProject, currentProject: project } = useProjects()

const filteredTasks = computed(() => {
  let filtered = tasks.value
  
  if (statusFilter.value !== 'all') {
    filtered = filtered.filter(task => task.status === statusFilter.value)
  }
  
  return {
    todo: filtered.filter(task => task.status === 'todo'),
    in_progress: filtered.filter(task => task.status === 'in_progress'),
    done: filtered.filter(task => task.status === 'done')
  }
})

const handleStatusChange = async (taskId: number, newStatus: string) => {
  try {
    await updateTaskStatus(taskId, newStatus)
  } catch (error) {
    console.error('Error updating task status:', error)
  }
}

const handleDeleteTask = async (taskId: number) => {
  if (confirm('Are you sure you want to delete this task?')) {
    try {
      await deleteTask(taskId)
    } catch (error) {
      console.error('Error deleting task:', error)
    }
  }
}

onMounted(async () => {
  await fetchProject(projectId)
  await fetchTasks(projectId)
})
</script>