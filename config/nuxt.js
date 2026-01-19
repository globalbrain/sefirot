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
    )
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
  return vite.mergeConfig(baseConfig, config)
}
