import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [vue()],

  resolve: {
    alias: {
      'sefirot/': new URL('./lib/', import.meta.url).pathname,
      'tests/': new URL('./tests/', import.meta.url).pathname
    }
  },

  test: {
    globals: true,
    environment: 'happy-dom',
    testTimeout: 2000,

    coverage: {
      provider: 'c8',
      all: true,
      src: ['lib'],
      include: ['lib'],
      exclude: [
        'lib/mixins',
        'lib/support/Day/plugins',
        'lib/types'
      ],
      reporter: [
        'html',
        'json',
        'lcov',
        'text-summary'
      ]
    }
  }
})
