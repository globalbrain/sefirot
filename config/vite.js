// @ts-check

/**
 * Adapted from
 * @see https://github.com/unplugin/unplugin-icons/blob/67fd9b7791dc1754cb8dc46b854b22c8bb4cf380/src/core/compilers/vue3.ts
 * @see https://github.com/unplugin/unplugin-icons/blob/639ec9691e022e52c641d0f96f585dbf04dab095/src/core/svgId.ts
 *
 * Original licenses:
 *
 * Copyright (c) 2020 Anthony Fu <https://github.com/antfu>
 * @license MIT
 */

import { fileURLToPath } from 'node:url'
import icons from 'unplugin-icons/vite'
import { mergeConfig } from 'vite'

/** @type {import('vite').UserConfig} */
export const baseConfig = {
  plugins: [
    icons({ scale: 1 }),
    {
      enforce: 'pre',
      name: 'sefirot:patch-linkify-it',
      transform(code, id) {
        if (id.includes('markdown-it')) {
          return code.replace(
            'const text_separators = "[><\uFF5C]"',
            'const text_separators = "[><\uFF00-\uFFEF]"' // https://www.fileformat.info/info/unicode/block/halfwidth_and_fullwidth_forms/index.htm
          )
        }
      }
    }
  ],

  resolve: {
    alias: { 'sefirot/': fileURLToPath(new URL('../lib/', import.meta.url)) },

    dedupe: [
      '@sentry/browser',
      '@tanstack/vue-virtual',
      '@tinyhttp/content-disposition',
      '@tinyhttp/cookie',
      '@vue/reactivity',
      '@vuelidate/core',
      '@vuelidate/validators',
      '@vueuse/core',
      'body-scroll-lock',
      'dayjs',
      'file-saver',
      'fuse.js',
      'lodash-es',
      'markdown-it',
      'normalize.css',
      'ofetch',
      'pinia',
      'qs',
      'v-calendar',
      'vue-router',
      'vue'
    ]
  },

  ssr: { noExternal: [/sentry/] },

  optimizeDeps: {
    include: [
      'dayjs',
      'dayjs/plugin/relativeTime',
      'dayjs/plugin/timezone',
      'dayjs/plugin/utc',
      'markdown-it'
    ]
  }
}

/**
 * @param {import('vite').UserConfigExport} config
 */
export function defineConfig(config = {}) {
  return async (/** @type {import("vite").ConfigEnv} */ configEnv) =>
    mergeConfig(baseConfig, await (typeof config === 'function' ? config(configEnv) : config))
}
