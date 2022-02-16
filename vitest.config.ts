/// <reference types="vitest" />

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],

  resolve: {
    alias: {
      'sefirot/': new URL('./lib/', import.meta.url).pathname,
      'tests/': new URL('./tests/', import.meta.url).pathname
    }
  },

  test: {
    global: true,
    environment: 'happy-dom',
    testTimeout: 2000,

    coverage: {
      reporter: [
        'html',
        'json',
        'lcov',
        'text-summary'
      ]
    }
  }
})
