<template>
  <AppLayout>
    <div class="py-6">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 class="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <div class="mt-6">
          <Card>
            <p class="text-gray-600">Welcome to your Iyata dashboard!</p>
            <div class="mt-4">
              <router-link to="/projects">
                <Button variant="primary">
                  View Projects
                </Button>
              </router-link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import AppLayout from '../../lib/layouts/AppLayout.vue'
import Card from '../../ui/useable-components/Card.vue'
import Button from '../../ui/useable-components/Button.vue'
</script>