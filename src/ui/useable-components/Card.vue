<template>
  <div :class="cardClasses">
    <div v-if="$slots.header || title" class="px-6 py-4 border-b border-gray-200">
      <div class="flex items-center justify-between">
        <h3 v-if="title" class="text-lg font-medium text-gray-900">
          {{ title }}
        </h3>
        <slot name="header"></slot>
      </div>
    </div>

    <div :class="contentClasses">
      <slot></slot>
    </div>

    <div v-if="$slots.footer" class="px-6 py-4 bg-gray-50 border-t border-gray-200">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script setup>
// ✅ AGREGAR esta importación
import { computed } from 'vue';

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  padding: {
    type: String,
    default: 'normal',
    validator: (value) => ['none', 'tight', 'normal', 'loose'].includes(value),
  },
  shadow: {
    type: Boolean,
    default: true,
  },
});

// ✅ AGREGAR computed
const cardClasses = computed(() => {
  const base = 'bg-white rounded-lg border border-gray-200';
  const shadowClass = props.shadow ? 'shadow-sm' : '';
  return `${base} ${shadowClass}`;
});

// ✅ AGREGAR computed para content classes
const contentClasses = computed(() => {
  const paddingClasses = {
    none: '',
    tight: 'px-4 py-3',
    normal: 'px-6 py-4',
    loose: 'px-8 py-6',
  };
  return paddingClasses[props.padding];
});
</script>