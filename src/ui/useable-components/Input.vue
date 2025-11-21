<template>
  <div class="input-group">
    <label 
      v-if="label" 
      :for="id" 
      class="block text-sm font-medium text-gray-700 mb-1"
    >
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>
    
    <div class="relative rounded-md shadow-sm">
      <div 
        v-if="hasIconSlot" 
        class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
      >
        <slot name="icon"></slot>
      </div>
      
      <input
        :id="id"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :required="required"
        :disabled="disabled"
        :class="inputClasses"
        @input="$emit('update:modelValue', $event.target.value)"
        @blur="$emit('blur', $event)"
      />
      
      <div 
        v-if="error" 
        class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"
      >
        <ExclamationCircleIcon class="h-5 w-5 text-red-500" />
      </div>
    </div>
    
    <div v-if="error" class="mt-1 text-sm text-red-600">
      {{ error }}
    </div>
    
    <div v-if="helper && !error" class="mt-1 text-sm text-gray-500">
      {{ helper }}
    </div>
  </div>
</template>

<script setup>
import { computed, useSlots } from 'vue';
import { ExclamationCircleIcon } from '@heroicons/vue/24/outline';

const slots = useSlots();

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: '',
  },
  id: {
    type: String,
    default: () => `input-${Math.random().toString(36).substr(2, 9)}`,
  },
  type: {
    type: String,
    default: 'text',
  },
  label: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: '',
  },
  error: {
    type: String,
    default: '',
  },
  helper: {
    type: String,
    default: '',
  },
  required: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

defineEmits(['update:modelValue', 'blur']);

// Computed para verificar si el slot icon existe
const hasIconSlot = computed(() => !!slots.icon);

const inputClasses = computed(() => {
  const base = 'block w-full rounded-md border shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-1 transition-colors';
  
  if (props.error) {
    return `${base} border-red-300 focus:border-red-500 focus:ring-red-500 pr-10 ${hasIconSlot.value ? 'pl-10' : 'px-3'} py-2`;
  }
  
  return `${base} border-gray-300 focus:border-blue-500 focus:ring-blue-500 ${hasIconSlot.value ? 'pl-10' : 'px-3'} py-2 disabled:bg-gray-100 disabled:cursor-not-allowed`;
});
</script>