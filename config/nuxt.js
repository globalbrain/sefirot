// @ts-check

import { fileURLToPath } from 'node:url'
import icons from 'unplugin-icons/nuxt'
import * as vite from 'vite'
import { baseConfig as baseViteConfig } from './vite.js'

export const baseConfig = {
  alias: { sefirot: fileURLToPath(new URL('../lib', import.meta.url)) },
  app: { teleportId: 'sefirot-modals' },
  modules: [
    /**
     * @this {any}
     * @param {any} _
     * @param {any} nuxt
     */
    function (_, nuxt) {
      return icons.bind(this, { scale: 1 }, nuxt)()
    }
  ],
  postcss: { plugins: { 'postcss-nested': {} } },
  telemetry: false,
  vite: {
    ...baseViteConfig,
    resolve: { ...baseViteConfig.resolve, alias: {} },
    plugins: baseViteConfig.plugins?.filter(
      (plugin) => plugin && 'name' in plugin && plugin.name !== 'unplugin-icons'
    ),
    optimizeDeps: {
      ...(baseViteConfig.optimizeDeps || {}),
      exclude: [
        ...(baseViteConfig.optimizeDeps?.exclude || []),
        '@vue/devtools-core',
        '@vue/devtools-kit'
      ]
    }
  },
  nitro: {
    rollupConfig: {
      plugins: [{
        name: 'custom:transpile-ts',
        /**
         * @param {string} code
         * @param {string} id
         */
        transform(code, id) {
          if (id.endsWith('.ts')) {
            // @ts-ignore
            if (vite.rolldownVersion) { return vite.transformWithOxc(code, id, { sourcemap: true }) }
            return vite.transformWithEsbuild(code, id, { sourcemap: true, loader: 'ts' })
          }
        }
      }]
    }
  }
}

export function defineConfig(config = {}) {
  return mergeConfig(baseConfig, config)
}

/**
 * @template T
 * @param {T} a
 * @param {Partial<T>} b
 * @see https://github.com/vuejs/vitepress/blob/d4796a0373eb486766cf48e63fdf461681424d43/src/node/config.ts#L291
 */
function mergeConfig(a, b, isRoot = true) {
  const merged = /** @type {any} */ ({ ...a })
  for (const key in b) {
    const value = /** @type {any} */ (b[key])
    if (value == null) {
      continue
    }
    const existing = merged[key]
    if (Array.isArray(existing) && Array.isArray(value)) {
      merged[key] = [...existing, ...value]
      continue
    }
    if (isObject(existing) && isObject(value)) {
      if (isRoot && key === 'vite') {
        merged[key] = vite.mergeConfig(existing, value)
      } else {
        merged[key] = mergeConfig(existing, value, false)
      }
      continue
    }
    merged[key] = value
  }
  return merged
}

/**
 * @param {unknown} value
 * @return {value is Record<PropertyKey, unknown>}
 * @see file://./../lib/support/Utils.ts#isObject
 */
function isObject(value) {
  if (value == null || typeof value !== 'object') { return false }

  const proto = Object.getPrototypeOf(value)
  return proto === null || proto === Object.prototype
}
