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
      provider: 'v8',
      all: true,
      include: ['lib'],
      exclude: [
        'lib/components/SSheet.vue',
        'lib/components/SSheetFooter.vue',
        'lib/components/SSheetFooterAction.vue',
        'lib/components/SSheetFooterActions.vue',
        'lib/components/SSheetForm.vue',
        'lib/components/SSheetMedium.vue',
        'lib/components/SSheetTitle.vue',
        'lib/mixins',
        'lib/support/Day/plugins',
        'lib/support/Day/Constant.ts',
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
