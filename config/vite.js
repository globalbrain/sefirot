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

import icons from 'unplugin-icons/vite'
import { mergeConfig } from 'vite'
import { compileTemplate } from 'vue/compiler-sfc'

const randIdFn = 'const __randId = () => Math.random().toString(36).substr(2, 10);'

/**
 * @param {string} svg
 * @returns {{ hasID: boolean, svg: string, injectScripts: string }}
 */
function handleSVGId(svg) {
  const hasID = /="url\(#/.test(svg)
  /** @type {Record<string, string>} */
  const idMap = {}
  let injectScripts = ''

  if (hasID) {
    svg = svg
      .replace(/\b([\w-]+?)="url\(#(.+?)\)"/g, (_, s, id) => {
        idMap[id] = `'${id}':'uicons-'+__randId()`
        return `:${s}="'url(#'+idMap['${id}']+')'"`
      })
      .replace(/\bid="(.+?)"/g, (full, id) => {
        if (idMap[id]) { return `:id="idMap['${id}']"` }
        return full
      })

    injectScripts = `${randIdFn}const idMap = {${Object.values(idMap).join(',')}};`
  }

  return { hasID, svg, injectScripts }
}

/**
 * @param {string} svg
 * @param {string} collection
 * @param {string} icon
 * @returns {string}
 */
function compiler(svg, collection, icon) {
  const { injectScripts, svg: handled } = handleSVGId(svg)

  let { code } = compileTemplate({
    source: handled,
    id: `${collection}:${icon}`,
    filename: `${collection}-${icon}.vue`
  })

  code = `import { markRaw } from 'vue'\n${code}`
  code = code.replace(/^export /gm, '')
  code += `\n\nexport default markRaw({ name: '${collection}-${icon}', render${
    injectScripts ? `, data() {${injectScripts};return { idMap }}` : ''
  } })`
  code += '\n/* vite-plugin-components disabled */'

  return code
}

/** @type {import('vite').UserConfig} */
export const baseConfig = {
  // TODO:: remove custom compiler when unplugin-icons is updated
  plugins: [icons({ scale: 1, compiler: { compiler } })],

  resolve: {
    alias: { 'sefirot/': new URL('../lib/', import.meta.url).pathname },

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
