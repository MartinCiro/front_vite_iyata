<template>
  <div class="min-h-screen bg-gray-100 flex">
    <!-- Sidebar -->
    <Sidebar />
    
    <!-- Main content area -->
    <div class="flex-1 flex flex-col">
      <Header />
      
      <!-- Main content - scrollable -->
      <main class="flex-1 overflow-auto">
        <div class="p-6">
          <div class="max-w-7xl mx-auto">
            <slot></slot>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import Header from './components/Header.vue';
import Sidebar from './components/Sidebar.vue';
</script>