// @ts-check

import { fileURLToPath } from 'node:url'
import MagicString from 'magic-string'
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
      'sefirot/': fileURLToPath(new URL('../lib/', import.meta.url))
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
      'normalize.css',
      'ofetch',
      'pinia',
      'qs',
      'v-calendar',
      'vue',
      'vue-router'
    ]
  },

  ssr: { noExternal: [/sentry/] },

  optimizeDeps: {
    include: [
      '@globalbrain/sefirot/dompurify',
      'dayjs',
      'dayjs/plugin/relativeTime',
      'dayjs/plugin/timezone',
      'dayjs/plugin/utc',
      'dompurify',
      'file-saver',
      'markdown-it > argparse',
      'markdown-it > entities'
    ],
    exclude: [
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
