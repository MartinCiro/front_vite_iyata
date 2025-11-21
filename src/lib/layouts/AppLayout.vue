<template>
  <div class="min-h-screen bg-gray-100">
    <Header />
    
    <div class="flex">
      <Sidebar />
      
      <!-- Main content -->
      <main class="flex-1 p-6">
        <div class="max-w-7xl mx-auto">
          <slot></slot>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import Header from './components/Header.vue';
import Sidebar from './components/Sidebar.vue';
</script>