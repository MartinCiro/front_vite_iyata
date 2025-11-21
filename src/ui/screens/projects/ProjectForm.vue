<template>
  <AppLayout>
    <div class="py-6">
      <div class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="mb-6">
          <router-link to="/projects" class="text-blue-600 hover:text-blue-800 flex items-center">
            <ArrowLeftIcon class="w-4 h-4 mr-1" />
            Back to Projects
          </router-link>
        </div>

        <Card>
          <template #header>
            <h1 class="text-xl font-semibold text-gray-900">
              {{ isEditing ? 'Edit Project' : 'Create New Project' }}
            </h1>
          </template>

          <form @submit.prevent="handleSubmit" class="space-y-6">
            <Input
              v-model="form.name"
              label="Project Name"
              type="text"
              placeholder="Enter project name"
              :error="errors.name"
              :required="true"
              @blur="validateField('name')"
            />

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                v-model="form.description"
                rows="4"
                class="block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-3 py-2"
                placeholder="Describe your project..."
              ></textarea>
            </div>

            <div v-if="isEditing">
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                v-model="form.status"
                class="block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-3 py-2"
              >
                <option value="pending">Pending</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <div class="flex justify-end space-x-3 pt-4">
              <router-link to="/projects">
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
                {{ isEditing ? 'Update Project' : 'Create Project' }}
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
import { useProjects } from '../../../lib/hooks/useProjects'
import { useForm } from '../../../lib/hooks/useForm'

const route = useRoute()
const router = useRouter()
const { createProject, updateProject, fetchProject, isLoading, currentProject } = useProjects()

const isEditing = computed(() => !!route.params.id)

const validations = {
  name: {
    required: 'Project name is required',
    minLength: 3,
    minLengthMessage: 'Project name must be at least 3 characters'
  }
}

const { form, errors, validate, validateField } = useForm(
  {
    name: '',
    description: '',
    status: 'pending'
  },
  validations
)

const handleSubmit = async () => {
  if (!validate()) return

  try {
    if (isEditing.value) {
      await updateProject(Number(route.params.id), form)
    } else {
      await createProject(form)
    }
    router.push('/projects')
  } catch (error) {
    console.error('Error saving project:', error)
  }
}

onMounted(async () => {
  if (isEditing.value) {
    await fetchProject(Number(route.params.id))
    if (currentProject.value) {
      form.name = currentProject.value.name
      form.description = currentProject.value.description
      form.status = currentProject.value.status
    }
  }
})
</script>