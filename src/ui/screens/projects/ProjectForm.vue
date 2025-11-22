<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ArrowLeftIcon } from '@heroicons/vue/24/outline'
import AppLayout from 'layouts/AppLayout.vue'
import Card from 'useable/Card.vue'
import Button from 'useable/Button.vue'
import Input from 'useable/Input.vue'
import { useProjects } from 'hooks/useProjects'
import { useForm } from 'hooks/useForm'

const route = useRoute()
const router = useRouter()
const { createProject, updateProject, fetchProject, isLoading, currentProject } = useProjects()

const isEditing = computed(() => !!route.params.id)
const isSubmitting = ref(false)

const validations = {
  title: {
    required: 'Project title is required',
    minLength: 3,
    minLengthMessage: 'Project title must be at least 3 characters'
  }
}

const { form, errors, validate, validateField } = useForm(
  {
    title: '',
    description: '',
    status: 'pending'
  },
  validations
)

const handleSubmit = async () => {
  if (!validate()) return
  
  isSubmitting.value = true
  
  try {
    if (isEditing.value) {
      await updateProject(Number(route.params.id), {
        title: form.title,
        description: form.description,
        status: form.status
      })
    } else {
      await createProject({
        title: form.title,
        description: form.description,
        status: form.status
      })
    }
    
    // Redirigir después de que la operación se complete exitosamente
    router.push('/projects')
  } catch (error) {
    console.error('Error saving project:', error)
    // Aquí podrías mostrar un mensaje de error al usuario
  } finally {
    isSubmitting.value = false
  }
}

// Cargar datos del proyecto cuando se edita
onMounted(async () => {
  if (isEditing.value) {
    try {
      await fetchProject(Number(route.params.id))
      if (currentProject.value) {
        form.title = currentProject.value.title || ''
        form.description = currentProject.value.description || ''
        form.status = currentProject.value.status || 'pending'
      }
    } catch (error) {
      console.error('Error loading project:', error)
    }
  }
})
</script>

<template>
  <AppLayout>
    <div class="py-6">
      <div class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Botón volver -->
        <div class="mb-6">
          <router-link to="/projects" class="inline-flex items-center text-sm text-gray-500 hover:text-gray-700">
            <ArrowLeftIcon class="w-4 h-4 mr-1" />
            Back to Projects
          </router-link>
        </div>

        <!-- Formulario -->
        <Card>
          <template #header>
            <h2 class="text-lg font-medium text-gray-900">
              {{ isEditing ? 'Edit Project' : 'Create New Project' }}
            </h2>
          </template>

          <form @submit.prevent="handleSubmit" class="space-y-6">
            <!-- Campo Título -->
            <Input
              label="Project Title"
              v-model="form.title"
              :error="errors.title"
              @blur="validateField('title')"
              placeholder="Enter project title"
              required
            />

            <!-- Campo Descripción -->
            <div>
              <label for="description" class="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                id="description"
                v-model="form.description"
                rows="4"
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter project description"
              ></textarea>
            </div>

            <!-- Campo Estado -->
            <div>
              <label for="status" class="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                id="status"
                v-model="form.status"
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="pending">Pending</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="active">Active</option>
              </select>
            </div>

            <!-- Botones -->
            <div class="flex justify-end space-x-3 pt-4">
              <router-link to="/projects">
                <Button type="button" variant="secondary">
                  Cancel
                </Button>
              </router-link>
              <Button 
                type="submit" 
                variant="primary"
                :disabled="isLoading || isSubmitting"
              >
                {{ isSubmitting ? 'Saving...' : (isEditing ? 'Update Project' : 'Create Project') }}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  </AppLayout>
</template>