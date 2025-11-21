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
            <Input
              v-model="form.title"
              label="Task Title"
              type="text"
              placeholder="Enter task title"
              :error="errors.title"
              :required="true"
              @blur="validateField('title')"
            />

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
import { computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ArrowLeftIcon } from '@heroicons/vue/24/outline'
import AppLayout from '../../../lib/layouts/AppLayout.vue'
import Card from '../../../ui/useable-components/Card.vue'
import Button from '../../../ui/useable-components/Button.vue'
import Input from '../../../ui/useable-components/Input.vue'
import { useTasks } from '../../lib/hooks/useTasks'
import { useProjects } from '../../../lib/hooks/useProjects'
import { useForm } from '../../../lib/hooks/useForm'

const route = useRoute()
const router = useRouter()
const projectId = Number(route.params.projectId)
const taskId = route.params.taskId ? Number(route.params.taskId) : null

const { createTask, updateTask, fetchTask, isLoading, currentTask } = useTasks()
const { fetchProject, currentProject: project } = useProjects()

const isEditing = computed(() => !!taskId)

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

  try {
    if (isEditing.value && taskId) {
      await updateTask(taskId, form)
    } else {
      await createTask(projectId, form)
    }
    router.push(`/projects/${projectId}/tasks`)
  } catch (error) {
    console.error('Error saving task:', error)
  }
}

onMounted(async () => {
  await fetchProject(projectId)
  
  if (isEditing.value && taskId) {
    await fetchTask(taskId)
    if (currentTask.value) {
      form.title = currentTask.value.title
      form.description = currentTask.value.description
      form.status = currentTask.value.status
      form.due_date = currentTask.value.due_date ? currentTask.value.due_date.split('T')[0] : ''
    }
  }
})
</script>