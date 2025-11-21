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
        <span class="logo-text">Iyata</span>
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
      <div class="nav-section">
        <h3 class="nav-section-title" v-if="sections.main.title">
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
              <span class="nav-text">{{ item.name }}</span>
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


      <!-- Bottom Section (Settings, Logout) -->
      <div class="nav-bottom">
        <div class="nav-section">
          <ul class="nav-list">
            <li>
              <button
                @click="handleLogout"
                class="nav-link nav-link-logout"
              >
                <ArrowRightOnRectangleIcon class="nav-icon" />
                <span class="nav-text">Logout</span>
              </button>
            </li>
          </ul>
        </div>

        <!-- User Profile -->
        <div class="user-profile">
          <div class="user-avatar">
            <img 
              :src="user?.avatar || '/default-avatar.png'" 
              :alt="user?.name"
              @error="handleAvatarError"
            />
          </div>
          <div class="user-info">
            <p class="user-name">{{ user?.name || 'User' }}</p>
            <p class="user-email">{{ user?.email || 'user@example.com' }}</p>
          </div>
        </div>
      </div>
    </nav>
  </aside>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuth } from '../../hooks/useAuth.js';
import {
  HomeIcon,
  ChartBarIcon,
  UsersIcon,
  DocumentTextIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  XMarkIcon,
  InboxIcon,
  CreditCardIcon
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

<style scoped>
.sidebar {
  width: 16rem;
  background-color: white;
  border-right: 1px solid #e5e7eb;
  display: flex;
  flex-direction: column;
  height: 100%;
}

/* Header */
.sidebar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  border-bottom: 1px solid #e5e7eb;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.logo-image {
  height: 2rem;
  width: 2rem;
}

.logo-text {
  font-size: 1.25rem;
  font-weight: bold;
  color: #111827;
}

.close-button {
  padding: 0.25rem;
  border-radius: 0.375rem;
  color: #9ca3af;
}

.close-button:hover {
  color: #4b5563;
  background-color: #f3f4f6;
}

/* Navigation */
.sidebar-nav {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

.nav-section {
  padding: 1rem;
}

.nav-section-title {
  font-size: 0.75rem;
  font-weight: 600;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.5rem;
}

.nav-list {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.nav-link {
  display: flex;
  align-items: center;
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  font-weight: 500;
  border-radius: 0.375rem;
  transition: all 0.2s;
  position: relative;
}

.nav-link:not(.nav-link-active):not(.nav-link-logout) {
  color: #374151;
}

.nav-link:not(.nav-link-active):not(.nav-link-logout):hover {
  color: #111827;
  background-color: #f3f4f6;
}

.nav-link-active {
  background-color: #eff6ff;
  color: #1d4ed8;
  border-right: 2px solid #1d4ed8;
}

.nav-link-logout {
  color: #dc2626;
  width: 100%;
  text-align: left;
}

.nav-link-logout:hover {
  color: #b91c1c;
  background-color: #fef2f2;
}

.nav-icon {
  height: 1.25rem;
  width: 1.25rem;
  margin-right: 0.75rem;
  flex-shrink: 0;
}

.nav-text {
  flex: 1;
}

.nav-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
  font-weight: bold;
  line-height: 1;
  color: white;
  background-color: #2563eb;
  border-radius: 9999px;
}

/* Bottom Section */
.nav-bottom {
  margin-top: auto;
  border-top: 1px solid #e5e7eb;
}

/* User Profile */
.user-profile {
  display: flex;
  align-items: center;
  padding: 1rem;
}

.user-avatar {
  height: 2.5rem;
  width: 2.5rem;
  border-radius: 9999px;
  background-color: #d1d5db;
  overflow: hidden;
  flex-shrink: 0;
}

.user-avatar img {
  height: 100%;
  width: 100%;
  object-fit: cover;
}

.user-info {
  margin-left: 0.75rem;
  min-width: 0;
}

.user-name {
  font-size: 0.875rem;
  font-weight: 500;
  color: #111827;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.user-email {
  font-size: 0.875rem;
  color: #6b7280;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>