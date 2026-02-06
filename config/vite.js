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

/** @type {import('vite').UserConfig} */
export const baseConfig = {
  plugins: [
    icons({ scale: 1 }),
    {
      enforce: 'pre',
      name: 'sefirot:patch-linkify-it',
      transform(code, id) {
        if (id.includes('linkify-it/lib/re.mjs')) {
          const s = new MagicString(code)

          const search = 'const text_separators = \'[><\\uff5c]\''
          const replace = 'const text_separators = \'[><\\uff00-\\uffef]\''

          const index = code.indexOf(search)
          if (index !== -1) {
            s.overwrite(index, index + search.length, replace)
          }

          return { code: s.toString(), map: s.generateMap({ source: id }) }
        }
      }
    }
  ],

  resolve: {
    alias: {
      'sefirot/': lib
    },

    // list the client-side direct dependencies/peerDependencies which get bundled
    dedupe: [
      '@popperjs/core',
      '@sentry/browser',
      '@sentry/vue',
      '@tanstack/vue-virtual',
      '@tinyhttp/content-disposition',
      '@tinyhttp/cookie',
      '@vue/reactivity',
      '@vuelidate/core',
      '@vuelidate/validators',
      '@vueuse/core',
      'body-scroll-lock',
      'd3',
      'dayjs',
      'dompurify',
      'file-saver',
      'fuse.js',
      'html2canvas',
      'lodash-es',
      'markdown-it',
      'maska',
      'normalize.css',
      'ofetch',
      'pinia',
      'qs',
      'vue',
      'vue-router'
    ]
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
      // eslint-disable-next-line style/multiline-ternary
      esbuildOptions: vite.rolldownVersion ? undefined : {
        define: {
          'navigator.userAgent': '""'
        }
      },
      // @ts-ignore
      // eslint-disable-next-line style/multiline-ternary
      rolldownOptions: vite.rolldownVersion ? {
        transform: {
          define: {
            'navigator.userAgent': '""'
          }
        }
      } : undefined
    }
  },

  optimizeDeps: {
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
      'qs'
    ],
    exclude: [
      '@vueuse/core',
      'fuse.js',
      'lodash-es',
      'markdown-it'
    ]
  }
}

/**
 * @param {import('vite').UserConfigExport} config
 */
export function defineConfig(config = {}) {
  return async (/** @type {import("vite").ConfigEnv} */ configEnv) =>
    vite.mergeConfig(baseConfig, await (typeof config === 'function' ? config(configEnv) : config))
}
