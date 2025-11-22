<template>
  <aside class="sidebar">
    <!-- Logo Section -->
    <div class="sidebar-header">
      <div class="logo">
        <img 
          src="" 
          alt="Logo" 
          class="logo-image"
          @error="handleImageError"
        />
        <!-- Logo texto visible en desktop, icono en móvil -->
        <span class="logo-text hidden sm:block">Iyata</span>
        <span class="logo-icon sm:hidden">I</span>
      </div>
      <button 
        v-if="showCloseButton"
        @click="$emit('close')"
        class="close-button"
      >
        <XMarkIcon class="h-5 w-5" />
      </button>
    </div>

    <!-- Navigation Section -->
    <nav class="sidebar-nav">
      <div class="nav-content">
        <div class="nav-section">
          <!-- Título solo visible en desktop -->
          <h3 class="nav-section-title hidden sm:block" v-if="sections.main.title">
            {{ sections.main.title }}
          </h3>
          <ul class="nav-list">
            <li v-for="item in sections.main.items" :key="item.name">
              <router-link
                :to="item.path"
                class="nav-link"
                :class="{ 'nav-link-active': isActive(item) }"
              >
                <component 
                  :is="item.icon" 
                  class="nav-icon"
                />
                <!-- Texto solo visible en desktop -->
                <span class="nav-text hidden sm:block">{{ item.name }}</span>
                <!-- Tooltip para móvil -->
                <div class="sm:hidden absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap">
                  {{ item.name }}
                </div>
                <span 
                  v-if="item.badge" 
                  class="nav-badge"
                >
                  {{ item.badge }}
                </span>
              </router-link>
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom Section (Settings, Logout) -->
      <div class="nav-bottom">
        <div class="nav-section">
          <ul class="nav-list">
            <li>
              <button
                @click="handleLogout"
                class="nav-link nav-link-logout group cursor-pointer"
              >
                <ArrowRightOnRectangleIcon class="nav-icon" />
                <!-- Texto solo visible en desktop -->
                <span class="nav-text hidden sm:block">Logout</span>
                <!-- Tooltip para móvil -->
                <div class="sm:hidden absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap">
                  Logout
                </div>
              </button>
            </li>
          </ul>
        </div>

        <!-- User Profile -->
        <div class="user-profile">
          <div class="user-avatar">
            <img 
              :src="user?.avatar || '/default-avatar.png'" 
              :alt="user?.first_name"
              @error="handleAvatarError"
            />
          </div>
          <!-- Info de usuario solo visible en desktop -->
          <div class="user-info hidden sm:block">
            <p class="user-name">{{ user?.first_name || 'User' }}</p>
            <p class="user-email">{{ user?.email || 'user@example.com' }}</p>
          </div>
        </div>
      </div>
    </nav>
  </aside>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuth } from 'hooks/useAuth.js';
import {
  HomeIcon,
  DocumentTextIcon,
  ArrowRightOnRectangleIcon,
  XMarkIcon,
} from '@heroicons/vue/24/outline';

// Props
const props = defineProps({
  showCloseButton: {
    type: Boolean,
    default: false
  },
  collapsed: {
    type: Boolean,
    default: false
  }
});

// Emits
defineEmits(['close']);

// Composable
const route = useRoute();
const router = useRouter();
const { user, logout } = useAuth();

// Navigation data
const navigationItems = {
  main: {
    title: 'Main',
    items: [
      { name: 'Dashboard', path: '/dashboard', icon: HomeIcon },
      { name: 'Projects', path: '/projects', icon: DocumentTextIcon },
    ]
  }
};

// Computed
const sections = computed(() => navigationItems);
const currentUser = computed(() => user.value);

// Methods
const isActive = (item) => {
  return route.path === item.path || route.path.startsWith(item.path + '/');
};

const handleLogout = async () => {
  try {
    await logout();
    router.push('/login');
  } catch (error) {
    console.error('Logout error:', error);
  }
};

const handleImageError = (event) => {
  event.target.style.display = 'none';
};

const handleAvatarError = (event) => {
  event.target.src = '/default-avatar.png';
};
</script>

