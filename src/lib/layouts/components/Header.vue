<template>
  <header class="bg-white shadow-sm border-b border-gray-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Left side - Title and Mobile Menu Button -->
        <div class="flex items-center space-x-4">
          <!-- Mobile Menu Button (solo en móvil) -->
          <button 
            @click="$emit('toggle-sidebar')"
            class="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <Bars3Icon class="h-5 w-5" />
          </button>
          
          <!-- Title -->
          <h1 class="text-xl font-semibold text-gray-900">
            <slot name="title">Iyata Dashboard</slot>
          </h1>
        </div>
        
        <!-- Right side - User info and actions -->
        <div class="flex items-center space-x-3 sm:space-x-4">
          <!-- Notifications (solo en desktop) -->
          <button 
            class="hidden sm:flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            title="Notifications"
          >
            <BellIcon class="h-5 w-5" />
          </button>

          <!-- Quick Actions Menu (solo en desktop) -->
          <div class="hidden md:flex items-center space-x-2">
            <router-link 
              to="/projects/create"
              class="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              title="New Project"
            >
              <PlusIcon class="h-5 w-5" />
            </router-link>
            <router-link 
              to="/settings"
              class="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              title="Settings"
            >
              <Cog6ToothIcon class="h-5 w-5" />
            </router-link>
          </div>

          <!-- User info -->
          <div class="flex items-center space-x-2 sm:space-x-3">
            <!-- User avatar with status indicator -->
            <div class="flex-shrink-0 relative">
              <img 
                :src="user?.avatar || '/default-avatar.png'" 
                :alt="user?.first_name || 'User'"
                class="h-8 w-8 rounded-full object-cover border-2 border-white"
                @error="handleAvatarError"
              />
              <!-- Online status indicator -->
              <div class="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            
            <!-- User name and email (solo en desktop) -->
            <div class="hidden sm:block">
              <p class="text-sm font-medium text-gray-900 truncate max-w-[120px]">
                {{ user?.first_name || 'User' }}
              </p>
              <p class="text-xs text-gray-500 truncate max-w-[120px]">
                {{ user?.email || 'user@example.com' }}
              </p>
            </div>
            
            <!-- Mobile only - just the name -->
            <div class="sm:hidden">
              <p class="text-sm font-medium text-gray-900">
                {{ user?.first_name || 'User' }}
              </p>
            </div>
          </div>
          <!-- Logout button -->
          <button 
            @click="handleLogout"
            class="hover:bg-gray-50 text-gray-700 p-2 cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed group"
            title="Logout"
          >
            <!-- Icono de logout -->
            <ArrowRightOnRectangleIcon class="h-5 w-5" />
            
            <!-- Tooltip para móvil (opcional) -->
            <div class="sm:hidden absolute -top-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap">
              Logout
            </div>
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { useAuth } from '../../hooks/useAuth.js';
import Button from 'useable/Button.vue';
import { ArrowRightOnRectangleIcon } from '@heroicons/vue/24/outline';

const { user, logout } = useAuth();

const handleLogout = async () => {
  try {
    await logout();
  } catch (error) {
    console.error('Logout error:', error);
  }
};

const handleAvatarError = (event) => {
  event.target.src = '/default-avatar.png';
};
</script>