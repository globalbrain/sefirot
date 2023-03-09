import { HstVue } from '@histoire/plugin-vue'
import { defaultColors, defineConfig } from 'histoire'

export default defineConfig({
  plugins: [
    HstVue()
  ],

  setupFile: 'stories/histoire.setup.ts',

  theme: {
    title: 'Sefirot',
    colors: {
      primary: defaultColors.neutral
    }
  },

  backgroundPresets: [
    { label: 'Transparent', color: 'transparent' },
    { label: 'Light', color: '#fafafa' },
    { label: 'Dark', color: '#191919' }
  ],

  defaultStoryProps: {
    autoPropsDisabled: true
  }
})
