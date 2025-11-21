<template>
  <header class="bg-white shadow-sm border-b border-gray-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <div class="flex items-center">
          <h1 class="text-xl font-semibold text-gray-900">
            <slot name="title">Iyata Dashboard</slot>
          </h1>
        </div>
        
        <div class="flex items-center space-x-4">
          <span class="text-sm text-gray-700">Welcome, {{ user?.name }}</span>
          <Button variant="outline" size="sm" @click="handleLogout">
            Logout
          </Button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { useAuth } from '../../hooks/useAuth.js';
import Button from '../../../ui/useable-components/Button.vue';

const { user, logout } = useAuth();

const handleLogout = async () => {
  await logout();
};
</script>