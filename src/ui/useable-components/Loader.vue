<template>
  <div :class="containerClasses">
    <svg
      :class="spinnerClasses"
      :width="size"
      :height="size"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        class="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      ></circle>
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
    <span v-if="text" :class="textClasses">{{ text }}</span>
  </div>
</template>

<script setup>
defineProps({
  size: {
    type: [String, Number],
    default: 24,
  },
  text: {
    type: String,
    default: '',
  },
  center: {
    type: Boolean,
    default: false,
  },
  color: {
    type: String,
    default: 'blue',
    validator: (value) => ['blue', 'gray', 'white'].includes(value),
  },
});

const containerClasses = computed(() => {
  return props.center ? 'flex flex-col items-center justify-center' : 'inline-flex items-center';
});

const spinnerClasses = computed(() => {
  const base = 'animate-spin';
  const colors = {
    blue: 'text-blue-600',
    gray: 'text-gray-600',
    white: 'text-white',
  };
  return `${base} ${colors[props.color]}`;
});

const textClasses = computed(() => {
  const base = 'ml-2 text-sm font-medium';
  const colors = {
    blue: 'text-blue-600',
    gray: 'text-gray-600',
    white: 'text-white',
  };
  return `${base} ${colors[props.color]}`;
});
</script>