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

        <!-- Buscador -->
        <div class="mb-6">
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon class="h-5 w-5 text-gray-400" />
            </div>
            <input
              v-model="searchTerm"
              type="text"
              class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search by title or description..."
              @input="handleSearch"
            />
          </div>
        </div>

        <Loader v-if="isLoading" text="Loading projects..." />
        
        <div v-else>
          <!-- Contador de resultados -->
          <div class="mb-4 text-sm text-gray-600">
            Showing {{ paginatedProjects.length }} of {{ filteredProjects.length }} projects
          </div>

          <!-- Grid de proyectos -->
          <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
            <Card 
              v-for="project in paginatedProjects" 
              :key="project.id"
              class="hover:shadow-md transition-shadow cursor-pointer group"
              @click="$router.push(`/projects/${project.id}`)"
            >
              <div class="flex justify-between items-start mb-2">
                <div class="flex-1 min-w-0 mr-2">
                  <h3 class="text-lg font-medium text-gray-900 truncate" :title="project.title">
                    {{ project.title }}
                  </h3>
                </div>
                <div :class="statusIconClasses(project.status)" class="p-2 rounded-full flex-shrink-0" :title="getStatusTitle(project.status)">
                  <component :is="getStatusIcon(project.status)" class="w-4 h-4" />
                </div>
              </div>
              <p class="text-gray-600 text-sm mb-4 line-clamp-2">{{ project.description }}</p>
              <div class="flex justify-between items-center text-sm text-gray-500">
                <div class="flex items-center">
                  <CalendarDaysIcon class="w-4 h-4 mr-1" />
                  <span>{{ formatDate(project.created_at) }}</span>
                </div>
                <div class="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    @click.stop="$router.push(`/projects/${project.id}/edit`)" 
                    class="text-blue-600 hover:text-blue-800 p-1 rounded hover:bg-blue-50"
                    title="Edit project"
                  >
                    <PencilSquareIcon class="w-4 h-4" />
                  </button>
                  <button 
                    @click.stop="deleteProject(project.id)" 
                    class="text-red-600 hover:text-red-800 p-1 rounded hover:bg-red-50"
                    title="Delete project"
                  >
                    <TrashIcon class="w-4 h-4" />
                  </button>
                </div>
              </div>
            </Card>
          </div>

          <!-- Paginador -->
          <div v-if="totalPages > 1" class="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
            <div class="flex flex-1 justify-between sm:hidden">
              <button
                @click="previousPage"
                :disabled="currentPage === 1"
                class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <button
                @click="nextPage"
                :disabled="currentPage === totalPages"
                class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
            <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
              <div>
                <p class="text-sm text-gray-700">
                  Showing
                  <span class="font-medium">{{ startIndex + 1 }}</span>
                  to
                  <span class="font-medium">{{ endIndex }}</span>
                  of
                  <span class="font-medium">{{ filteredProjects.length }}</span>
                  results
                </p>
              </div>
              <div>
                <nav class="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                  <button
                    @click="previousPage"
                    :disabled="currentPage === 1"
                    class="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span class="sr-only">Previous</span>
                    <ChevronLeftIcon class="h-5 w-5" />
                  </button>
                  
                  <!-- Números de página -->
                  <button
                    v-for="page in visiblePages"
                    :key="page"
                    @click="goToPage(page)"
                    :class="[
                      'relative inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0',
                      currentPage === page
                        ? 'bg-blue-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'
                        : 'text-gray-900 hover:bg-gray-50'
                    ]"
                  >
                    {{ page }}
                  </button>
                  
                  <button
                    @click="nextPage"
                    :disabled="currentPage === totalPages"
                    class="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span class="sr-only">Next</span>
                    <ChevronRightIcon class="h-5 w-5" />
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>

        <div v-if="!isLoading && filteredProjects.length === 0" class="text-center py-12">
          <DocumentTextIcon class="mx-auto h-12 w-12 text-gray-400" />
          <h3 class="mt-2 text-sm font-medium text-gray-900">
            {{ searchTerm ? 'No projects found' : 'No projects' }}
          </h3>
          <p class="mt-1 text-sm text-gray-500">
            {{ searchTerm ? 'Try adjusting your search terms' : 'Get started by creating a new project.' }}
          </p>
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
import { onMounted, ref, computed, watch } from 'vue'
import { 
  PlusIcon, 
  DocumentTextIcon, 
  PencilSquareIcon, 
  TrashIcon,
  CalendarDaysIcon,
  CheckCircleIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  PlayCircleIcon,
  MagnifyingGlassIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/vue/24/outline'
import AppLayout from 'layouts/AppLayout.vue'
import Card from 'useable/Card.vue'
import Button from 'useable/Button.vue'
import Loader from 'useable/Loader.vue'
import { useProjects } from 'hooks/useProjects'

const { projects, isLoading, fetchProjects, deleteProject } = useProjects()

// Estado reactivo
const searchTerm = ref('')
const currentPage = ref(1)
const itemsPerPage = ref(6)

// Computed properties
const filteredProjects = computed(() => {
  if (!searchTerm.value.trim()) return projects.value

  const term = searchTerm.value.toLowerCase().trim()
  return projects.value.filter(project => 
    project.title?.toLowerCase().includes(term) ||
    project.description?.toLowerCase().includes(term)
  )
})

const totalPages = computed(() =>  Math.ceil(filteredProjects.value.length / itemsPerPage.value))

const paginatedProjects = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredProjects.value.slice(start, end)
})

const startIndex = computed(() =>  (currentPage.value - 1) * itemsPerPage.value)

const endIndex = computed(() => Math.min(currentPage.value * itemsPerPage.value, filteredProjects.value.length))

const visiblePages = computed(() => {
  const maxVisiblePages = 5
  let startPage = Math.max(1, currentPage.value - Math.floor(maxVisiblePages / 2))
  let endPage = Math.min(totalPages.value, startPage + maxVisiblePages - 1)
  
  // Ajustar si estamos cerca del final
  if (endPage - startPage + 1 < maxVisiblePages) startPage = Math.max(1, endPage - maxVisiblePages + 1)
  
  return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i)
})

// Métodos
const handleSearch = () => currentPage.value = 1

const previousPage = () => {
  if (currentPage.value > 1) currentPage.value--
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++
}

const goToPage = (page: number) => currentPage.value = page

const getStatusIcon = (status: string) => {
  const icons = {
    pending: ExclamationTriangleIcon,
    in_progress: ClockIcon,
    completed: CheckCircleIcon,
    active: PlayCircleIcon
  }
  return icons[status as keyof typeof icons] || ClockIcon
}

const statusIconClasses = (status: string) => {
  const classes = {
    pending: 'bg-yellow-100 text-yellow-600',
    in_progress: 'bg-blue-100 text-blue-600',
    completed: 'bg-green-100 text-green-600',
    active: 'bg-green-100 text-green-600'
  }
  return classes[status as keyof typeof classes] || 'bg-gray-100 text-gray-600'
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

const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString()

// Watchers
watch(searchTerm, () => currentPage.value = 1)

// Si la página actual no tiene elementos después de filtrar, ir a la última página válida
watch(filteredProjects, () => {
  if (currentPage.value > totalPages.value && totalPages.value > 0) currentPage.value = totalPages.value
})

onMounted(() => fetchProjects())
</script>