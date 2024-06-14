/// <reference lib="esnext" />
/// <reference types="vitest" />

import Vue from '@vitejs/plugin-vue'
import Icons from 'unplugin-icons/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [Vue(), Icons()],

  resolve: {
    alias: {
      'sefirot/': new URL('./lib/', import.meta.url).pathname,
      'tests/': new URL('./tests/', import.meta.url).pathname
    }
  },

  ssr: {
    noExternal: [/sentry/]
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
