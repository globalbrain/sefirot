import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],

  resolve: {
    alias: {
      'sefirot/': new URL('./lib/', import.meta.url).pathname
    }
  }
})
