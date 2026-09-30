// @ts-check
/// <reference lib="esnext" />

import { glob } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import icons from 'unplugin-icons/vite'
import * as vite from 'vite'

const lib = fileURLToPath(new URL('../lib/', import.meta.url))
// eslint-disable-next-line antfu/no-top-level-await
const files = (await Array.fromAsync(glob(`**/*.ts`, { cwd: lib })))
  .filter((file) => !file.endsWith('.d.ts'))
  .map((file) => `sefirot/${file}`.replace(/(?:\/index)?\.ts$/, ''))

/** @type {import('vite').UserConfig} */
export const baseConfig = {
  plugins: [
    icons({ scale: 1 })
  ],

  resolve: {
    alias: {
      'sefirot/': lib
    }
  },

  ssr: {
    noExternal: [/(?:^|\/)dayjs/]
  },

  optimizeDeps: {
    // @keep-sorted
    include: [
      ...files,
      '@globalbrain/sefirot/dompurify',
      '@tinyhttp/content-disposition',
      '@tinyhttp/cookie',
      'dompurify',
      'html2canvas',
      'markdown-it > entities',
      'pinia',
      'qs'
    ],
    // @keep-sorted
    exclude: [
      '@vueuse/core',
      'fuse.js',
      'lodash-es',
      'markdown-it',
      'vue-draggable-plus'
    ]
  }
}

/**
 * @param {import('vite').UserConfigExport} config
 */
export function defineConfig(config = {}) {
  return async (/** @type {import('vite').ConfigEnv} */ configEnv) =>
    vite.mergeConfig(baseConfig, await (typeof config === 'function' ? config(configEnv) : config))
}
