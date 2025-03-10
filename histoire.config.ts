import { HstVue as hstVue } from '@histoire/plugin-vue'
import { defaultColors, defineConfig } from 'histoire'
import { baseConfig } from './config/vite'

function getDocsHost(): string {
  if (process.env.CONTEXT !== 'production' && process.env.DEPLOY_PRIME_URL) {
    return new URL(process.env.DEPLOY_PRIME_URL).host.replace('-story', '-docs')
  }
  return 'sefirot.globalbrains.com'
}

export default defineConfig({
  plugins: [hstVue()],
  setupFile: 'stories/histoire.setup.ts',
  defaultStoryProps: { autoPropsDisabled: true },

  theme: { title: 'Sefirot', colors: { primary: defaultColors.neutral } },
  backgroundPresets: [
    { label: 'Transparent', color: 'transparent' },
    { label: 'Light', color: '#fafafa' },
    { label: 'Dark', color: '#191919' }
  ],

  vite: {
    ...baseConfig,
    define: {
      __DOCS_HOST__: JSON.stringify(getDocsHost())
    },
    optimizeDeps: { ...baseConfig.optimizeDeps, noDiscovery: true } // vite 6 compat,
  }
})
