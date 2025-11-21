<template>
  <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <div class="flex justify-center">
        <div class="flex items-center">
          <svg class="h-8 w-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd" />
          </svg>
          <span class="ml-2 text-2xl font-bold text-gray-900">Iyata</span>
        </div>
      </div>
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
        {{ title }}
      </h2>
      <p v-if="subtitle" class="mt-2 text-center text-sm text-gray-600">
        {{ subtitle }}
      </p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <Card :shadow="true" :padding="'loose'">
        <slot></slot>
      </Card>
    </div>
  </div>
</template>

<script setup>
import Card from '../../ui/useable-components/Card.vue';

defineProps({
  title: {
    type: String,
    default: 'Welcome',
  },
  subtitle: {
    type: String,
    default: '',
  },
});
</script>