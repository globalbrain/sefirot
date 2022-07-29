/// <reference types="histoire/vue" />
import { defaultColors, defineConfig } from 'histoire'

export default defineConfig({
  setupFile: 'histoire.setup.ts',
  theme: {
    title: 'Sefirot',
  },
  backgroundPresets: [
    {
      label: 'Transparent',
      color: 'transparent',
    },
    {
      label: 'Light',
      color: '#fff',
    },
    {
      label: 'Dark',
      color: '#171717'
    }
  ]
})
