import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../lib/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/dashboard',
      meta: { requiresAuth: true }
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../ui/screens/auth/Login.vue'),
      meta: { requiresGuest: true }
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('../ui/screens/auth/Register.vue'),
      meta: { requiresGuest: true }
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: () => import('../ui/screens/Dashboard.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/projects',
      name: 'Projects',
      component: () => import('../ui/screens/projects/ProjectList.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/projects/create',
      name: 'ProjectCreate',
      component: () => import('../ui/screens/projects/ProjectForm.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/projects/:id',
      name: 'ProjectView',
      component: () => import('../ui/screens/projects/ProjectView.vue'),
      meta: { requiresAuth: true },
      props: true
    },
    {
      path: '/projects/:id/edit',
      name: 'ProjectEdit',
      component: () => import('../ui/screens/projects/ProjectForm.vue'),
      meta: { requiresAuth: true },
      props: true
    },
    {
      path: '/projects/:projectId/tasks',
      name: 'ProjectTasks',
      component: () => import('../ui/screens/tasks/TaskList.vue'),
      meta: { requiresAuth: true },
      props: true
    },
    {
      path: '/projects/:projectId/tasks/create',
      name: 'TaskCreate',
      component: () => import('../ui/screens/tasks/TaskForm.vue'),
      meta: { requiresAuth: true },
      props: true
    },
    {
      path: '/projects/:projectId/tasks/:taskId/edit',
      name: 'TaskEdit',
      component: () => import('../ui/screens/tasks/TaskForm.vue'),
      meta: { requiresAuth: true },
      props: true
    }
  ],
})

// Navigation guard con TypeScript
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login')
  } else if (to.meta.requiresGuest && authStore.isAuthenticated) {
    next('/dashboard')
  } else {
    next()
  }
})

export default router