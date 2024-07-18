/// <reference lib="esnext" />
/// <reference types="vitest" />

import vue from '@vitejs/plugin-vue'
import { defineConfig } from './config/vite'

export default defineConfig({
  plugins: [vue()],

  resolve: {
    alias: {
      'tests/': new URL('./tests/', import.meta.url).pathname
    }
  },

  test: {
    globals: true,
    environment: 'happy-dom',
    testTimeout: 2000,
    setupFiles: ['./tests/vitest.setup.ts'],

    coverage: {
      provider: 'v8',
      all: true,
      include: ['lib'],
      reporter: ['html', 'json', 'lcov', 'text-summary']
    },

    onConsoleLog(log, type) {
      if (type !== 'stderr') { return }
      ignore.forEach((s) => (log = log.replaceAll(s, '')))
      if (log.trim() === '') { return false }
    }
  }
})

const ignore = [
  '[Vue warn]: inject() can only be used inside setup() or functional components.',
  '[Vue Router warn]: No match found for location with path "about"',
  '[Vue Router warn]: No match found for location with path "https://example.com"'
]
