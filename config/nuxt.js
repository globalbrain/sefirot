// @ts-check

import { fileURLToPath } from 'node:url'
import icons from 'unplugin-icons/nuxt'
import { mergeConfig } from 'vite'
import { baseConfig as baseViteConfig } from './vite.js'

export const baseConfig = {
  alias: { sefirot: fileURLToPath(new URL('../lib', import.meta.url)) },
  app: { teleportId: 'sefirot-modals' },
  modules: [
    /**
     * @param {any} _
     * @param {any} nuxt
     */
    function (_, nuxt) {
      // eslint-disable-next-line @typescript-eslint/no-invalid-this
      return icons.bind(this, { scale: 1 }, nuxt)()
    }
  ],
  postcss: { plugins: { 'postcss-nested': {} } },
  telemetry: false,
  vite: {
    ...baseViteConfig,
    resolve: { ...baseViteConfig.resolve, alias: {} },
    plugins: baseViteConfig.plugins?.filter((plugin) =>
      plugin && 'name' in plugin ? plugin.name !== 'unplugin-icons' : null
    )
  }
}

export function defineConfig(config = {}) {
  return mergeConfig(baseConfig, config)
}
