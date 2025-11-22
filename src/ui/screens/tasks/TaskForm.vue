<template>
  <AppLayout>
    <div class="py-6">
      <div class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="mb-6">
          <router-link :to="`/projects/${projectId}/tasks`" class="text-blue-600 hover:text-blue-800 flex items-center">
            <ArrowLeftIcon class="w-4 h-4 mr-1" />
            Back to Tasks
          </router-link>
        </div>

        <Card>
          <template #header>
            <h1 class="text-xl font-semibold text-gray-900">
              {{ isEditing ? 'Edit Task' : 'Create New Task' }}
            </h1>
            <p class="text-sm text-gray-600 mt-1" v-if="project">
              Project: {{ project.name }}
            </p>
          </template>

          <form @submit.prevent="handleSubmit" class="space-y-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Task Title *
              </label>
              <input
                v-model="form.title"
                type="text"
                placeholder="Enter task title"
                class="block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-3 py-2"
                :class="{ 'border-red-500': errors.title }"
                @blur="validateField('title')"
              />
              <p v-if="errors.title" class="text-red-500 text-sm mt-1">{{ errors.title }}</p>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                v-model="form.description"
                rows="4"
                class="block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-3 py-2"
                placeholder="Describe the task..."
              ></textarea>
            </div>

            <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  v-model="form.status"
                  class="block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-3 py-2"
                >
                  <option value="todo">To Do</option>
                  <option value="in_progress">In Progress</option>
                  <option value="done">Done</option>
                </select>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Due Date
                </label>
                <input
                  v-model="form.due_date"
                  type="date"
                  class="block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-3 py-2"
                />
              </div>
            </div>

            <div class="flex justify-end space-x-3 pt-4">
              <router-link :to="`/projects/${projectId}/tasks`">
                <Button variant="outline" type="button">
                  Cancel
                </Button>
              </router-link>
              <Button 
                variant="primary" 
                type="submit"
                :loading="isLoading"
                :loading-text="isEditing ? 'Updating...' : 'Creating...'"
              >
                {{ isEditing ? 'Update Task' : 'Create Task' }}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ArrowLeftIcon } from '@heroicons/vue/24/outline'
import AppLayout from 'layouts/AppLayout.vue'
import Card from 'useable/Card.vue'
import Button from 'useable/Button.vue'
import { useTasks } from 'hooks/useTasks'
import { useProjects } from 'hooks/useProjects'
import { useForm } from 'hooks/useForm'

const route = useRoute()
const router = useRouter()
const projectId = Number(route.params.projectId)
const taskId = route.params.taskId ? Number(route.params.taskId) : null

const { createTask, updateTask, fetchTask, isLoading, currentTask } = useTasks()
const { fetchProject, currentProject: project } = useProjects()

const isEditing = computed(() => !!taskId)
const isSubmitting = ref(false)

const validations = {
  title: {
    required: 'Task title is required',
    minLength: 3,
    minLengthMessage: 'Task title must be at least 3 characters'
  }
}

const { form, errors, validate, validateField } = useForm(
  {
    title: '',
    description: '',
    status: 'todo',
    due_date: ''
  },
  validations
)

const handleSubmit = async () => {
  
  if (!validate()) return
  
  isSubmitting.value = true
  
  try {
    const taskData = {
      title: form.title,
      description: form.description,
      status: form.status,
      due_date: form.due_date ? new Date(form.due_date).toISOString() : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      project_id: projectId
    }

    isEditing.value && taskId ? await updateTask(taskId, taskData) : await createTask(taskData)
    
    router.push(`/projects/${projectId}/tasks`)
  } catch (error) {
    console.error('Error saving task:', error)
  } finally {
    isSubmitting.value = false
  }
}

onMounted(async () => {
  await fetchProject(projectId)
  
  if (isEditing.value && taskId) {
    await fetchTask(taskId)
    if (currentTask.value) {
      form.title = currentTask.value.title || ''
      form.description = currentTask.value.description || ''
      form.status = currentTask.value.status || 'todo'
      form.due_date = currentTask.value.due_date ? currentTask.value.due_date.split('T')[0] : ''
    }
  }
})
</script>