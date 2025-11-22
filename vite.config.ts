import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      'constants': fileURLToPath(new URL('./src/utils/constants', import.meta.url)),
      'services': fileURLToPath(new URL('./src/lib/services', import.meta.url)),
      'hooks': fileURLToPath(new URL('./src/lib/hooks', import.meta.url)),
      'useable': fileURLToPath(new URL('./src/ui/useable-components', import.meta.url)),
      'screens': fileURLToPath(new URL('./src/ui/screens', import.meta.url)),
      'styles': fileURLToPath(new URL('./src/ui/styles', import.meta.url)),
      'layouts': fileURLToPath(new URL('./src/lib/layouts', import.meta.url)),
    },
  },
})
