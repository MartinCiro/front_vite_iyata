<template>
  <header class="bg-white shadow-sm border-b border-gray-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Left side - Title -->
        <div class="flex items-center">
          <h1 class="text-xl font-semibold text-gray-900">
            <slot name="title">Iyata Dashboard</slot>
          </h1>
        </div>
        
        <!-- Right side - User info and actions -->
        <div class="flex items-center space-x-4">
          <!-- User info -->
          <div class="flex items-center space-x-3">
            <!-- User avatar -->
            <div class="flex-shrink-0">
              <img 
                :src="user?.avatar || '/default-avatar.png'" 
                :alt="user?.name || 'User'"
                class="h-8 w-8 rounded-full object-cover"
                @error="handleAvatarError"
              />
            </div>
            
            <!-- User name and email -->
            <div class="hidden sm:block">
              <p class="text-sm font-medium text-gray-900">
                {{ user?.name || 'User' }}
              </p>
              <p class="text-xs text-gray-500">
                {{ user?.email || 'user@example.com' }}
              </p>
            </div>
            
            <!-- Mobile only - just the name -->
            <div class="sm:hidden">
              <p class="text-sm font-medium text-gray-900">
                {{ user?.name || 'User' }}
              </p>
            </div>
          </div>

          <!-- Logout button -->
          <Button variant="outline" size="sm" @click="handleLogout">
            <span class="hidden sm:inline">Logout</span>
            <span class="sm:hidden">
              <ArrowRightOnRectangleIcon class="h-4 w-4" />
            </span>
          </Button>
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