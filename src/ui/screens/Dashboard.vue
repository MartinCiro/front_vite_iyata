<!-- src/ui/screens/dashboard/Dashboard.vue -->
<template>
  <AppLayout>
    <!-- Header -->
    <div class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center py-6">
          <div>
            <h1 class="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p class="mt-1 text-sm text-gray-500">
              Welcome back, {{ user?.first_name || 'User' }}! Here's your overview.
            </p>
          </div>
          <div class="flex items-center space-x-3">
            <!-- Botón Refresh -->
            <button 
              @click="refreshData"
              :disabled="isLoading"
              class="cursor-pointer border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-full p-2 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              title="Refresh data"
            >
              <ArrowPathIcon 
                class="h-5 w-5" 
                :class="{ 'animate-spin': isLoading }" 
              />
            </button>

            <!-- Botón New Project -->
            <router-link to="/projects/create">
              <button 
                class="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white rounded-full p-2 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                title="Create new project"
              >
                <PlusIcon class="h-5 w-5" />
              </button>
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Stats Grid -->
      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card class="p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <UsersIcon class="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-500">Total Users</p>
              <p class="text-2xl font-semibold text-gray-900">{{ stats.totalUsers }}</p>
            </div>
          </div>
        </Card>

        <Card class="p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircleIcon class="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-500">Active Projects</p>
              <p class="text-2xl font-semibold text-gray-900">{{ stats.activeProjects }}</p>
            </div>
          </div>
        </Card>

        <Card class="p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <InboxIcon class="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-500">Tasks Completed</p>
              <p class="text-2xl font-semibold text-gray-900">{{ stats.tasksCompleted }}</p>
            </div>
          </div>
        </Card>

        <Card class="p-6">
          <div class="flex items-center">
            <div class="flex-shrink-0">
              <div class="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <ClockIcon class="h-6 w-6 text-yellow-600" />
              </div>
            </div>
            <div class="ml-4">
              <p class="text-sm font-medium text-gray-500">Pending Tasks</p>
              <p class="text-2xl font-semibold text-gray-900">{{ stats.pendingTasks }}</p>
            </div>
          </div>
        </Card>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Left Column -->
        <div class="lg:col-span-2 space-y-8">
          <!-- Welcome Card -->
          <Card class="p-8">
            <div class="text-center">
              <div class="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <UserCircleIcon class="h-10 w-10 text-white" />
              </div>
              <h2 class="text-2xl font-bold text-gray-900 mb-4">
                Welcome to Iyata, {{ user?.first_name || 'User' }}!
              </h2>
              <p class="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
                Manage your projects, track progress, and collaborate with your team in one place. 
                Get started by creating your first project or exploring existing ones.
              </p>
              <div class="flex flex-col sm:flex-row gap-4 justify-center">
                <router-link to="/projects" class="flex-1 sm:flex-none">
                  <Button variant="primary" size="lg" class="w-full">
                    <FolderIcon class="h-5 w-5 mr-2" />
                    View Projects
                  </Button>
                </router-link>
                <Button variant="outline" size="lg" class="w-full sm:w-auto">
                  <DocumentTextIcon class="h-5 w-5 mr-2" />
                  Documentation
                </Button>
              </div>
            </div>
          </Card>

          <!-- Recent Activity -->
          <Card>
            <template #header>
              <div class="flex items-center justify-between">
                <h3 class="text-lg font-medium text-gray-900">Recent Activity</h3>
                <span class="text-sm text-gray-500">Last 7 days</span>
              </div>
            </template>
            <div class="space-y-4">
              <div 
                v-for="activity in recentActivity"
                :key="activity.id"
                class="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div class="flex-shrink-0">
                  <div class="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <component 
                      :is="activity.icon" 
                      class="h-4 w-4 text-blue-600"
                    />
                  </div>
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-sm text-gray-900">
                    <span class="font-medium">{{ activity.user }}</span>
                    {{ activity.action }}
                  </p>
                  <p class="text-sm text-gray-500">{{ activity.time }}</p>
                </div>
                <span 
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                  :class="activity.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'"
                >
                  {{ activity.type }}
                </span>
              </div>
            </div>
          </Card>
        </div>

        <!-- Right Column -->
        <div class="space-y-8">
          <!-- Quick Actions -->
          <Card>
            <template #header>
              <h3 class="text-lg font-medium text-gray-900">Quick Actions</h3>
            </template>
            <div class="space-y-3">
              <router-link
                v-for="action in quickActions"
                :key="action.name"
                :to="action.path"
                class="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors group"
              >
                <div class="flex-shrink-0">
                  <div class="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                    <component 
                      :is="action.icon" 
                      class="h-5 w-5 text-blue-600"
                    />
                  </div>
                </div>
                <div>
                  <h4 class="font-medium text-gray-900">{{ action.name }}</h4>
                  <p class="text-sm text-gray-500">{{ action.description }}</p>
                </div>
              </router-link>
            </div>
          </Card>

          <!-- User Profile Card -->
          <Card>
            <template #header>
              <h3 class="text-lg font-medium text-gray-900">Your Profile</h3>
            </template>
            <div class="text-center">
              <div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <UserCircleIcon class="h-8 w-8 text-white" />
              </div>
              <h4 class="font-semibold text-gray-900">{{ user?.first_name }} {{ user?.last_name }}</h4>
              <p class="text-sm text-gray-500 mb-4">{{ user?.email }}</p>
              <div class="flex justify-center space-x-2">
                <span 
                  v-if="user?.is_temporary"
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800"
                >
                  Demo Account
                </span>
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Active
                </span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useAuth } from 'hooks/useAuth.js'
import AppLayout from 'layouts/AppLayout.vue'
import Card from 'useable/Card.vue'
import Button from 'useable/Button.vue'
import {
  ArrowPathIcon,
  PlusIcon,
  UsersIcon,
  CheckCircleIcon,
  InboxIcon,
  ClockIcon,
  UserCircleIcon,
  FolderIcon,
  DocumentTextIcon,
  DocumentPlusIcon,
  ChartBarIcon,
  CogIcon,
  UserPlusIcon
} from '@heroicons/vue/24/outline'

const { user, isLoading, fetchCurrentUser } = useAuth()

// Stats data
const stats = ref({
  totalUsers: 12,
  activeProjects: 8,
  tasksCompleted: 156,
  pendingTasks: 23
})

// Recent activity
const recentActivity = ref([
  {
    id: 1,
    user: 'You',
    action: 'created a new project "Website Redesign"',
    time: '2 hours ago',
    icon: DocumentPlusIcon,
    type: 'success'
  },
  {
    id: 2,
    user: 'John Doe',
    action: 'completed task "Design System"',
    time: '4 hours ago',
    icon: CheckCircleIcon,
    type: 'success'
  },
  {
    id: 3,
    user: 'Jane Smith',
    action: 'requested access to "API Documentation"',
    time: '1 day ago',
    icon: FolderIcon,
    type: 'info'
  }
])

// Quick actions
const quickActions = ref([
  {
    name: 'Create Project',
    description: 'Start a new project',
    icon: DocumentPlusIcon,
    path: '/projects/create'
  },
  {
    name: 'Team Members',
    description: 'Manage your team',
    icon: UserPlusIcon,
    path: '/team'
  },
  {
    name: 'Analytics',
    description: 'View reports',
    icon: ChartBarIcon,
    path: '/analytics'
  },
  {
    name: 'Settings',
    description: 'Configure workspace',
    icon: CogIcon,
    path: '/settings'
  }
])

// Methods
const refreshData = async () => {
  await fetchCurrentUser()
  // Simular actualización de datos
  stats.value.tasksCompleted += Math.floor(Math.random() * 5)
}

// Lifecycle
onMounted(() => fetchCurrentUser())

</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>