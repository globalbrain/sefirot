// @ts-check
/// <reference lib="esnext" />

import { glob } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import MagicString from 'magic-string'
import icons from 'unplugin-icons/vite'
import * as vite from 'vite'

const lib = fileURLToPath(new URL('../lib/', import.meta.url))
// eslint-disable-next-line antfu/no-top-level-await
const files = (await Array.fromAsync(glob(`**/*.ts`, { cwd: lib })))
  .filter((file) => !file.endsWith('.d.ts'))
  .map((file) => `sefirot/${file}`.replace(/(?:\/index)?\.ts$/, ''))

// @ts-ignore
const isRolldown = !!vite.rolldownVersion

const define = {
  'navigator.userAgent': '""'
}

/** @type {import('vite').UserConfig} */
export const baseConfig = {
  plugins: [
    icons({ scale: 1 }),
    {
      enforce: 'pre',
      name: 'sefirot:patch-linkify-it',
      transform: {
        filter: {
          id: /linkify-it[\\/]lib[\\/]re\.m?js(?:$|\?)/
        },
        handler(code, id) {
          const s = new MagicString(code)

          const search = 'const text_separators = \'[><\\uff5c]\''
          const replace = 'const text_separators = \'[><\\uff00-\\uffef]\''

          s.replace(search, replace)

          return { code: s.toString(), map: s.generateMap({ source: id }) }
        }
      }
    }
  ],

  resolve: {
    alias: {
      'sefirot/': lib
    }
  },

  ssr: {
    noExternal: [
      /sentry/
    ],
    optimizeDeps: {
      include: [
        'file-saver'
      ],
      // @ts-ignore
      esbuildOptions: isRolldown ? undefined : { define },
      // @ts-ignore
      rolldownOptions: isRolldown ? { transform: { define } } : undefined
    }
  },

  optimizeDeps: {
    // @keep-sorted
    include: [
      ...files,
      '@globalbrain/sefirot/dompurify',
      'dayjs',
      'dayjs/plugin/relativeTime',
      'dayjs/plugin/timezone',
      'dayjs/plugin/utc',
      'dompurify',
      'file-saver',
      'markdown-it > argparse',
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
