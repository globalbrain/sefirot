import { inBrowser, type Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'

import 'sefirot/styles/variables.css'
import './styles.css'

import Showcase from './components/Showcase.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('Showcase', Showcase)
  },
  setup() {
    if (inBrowser) {
      const target = document.getElementById('sefirot-modals')
      if (!target) {
        const target = document.createElement('div')
        target.id = 'sefirot-modals'
        document.body.appendChild(target)
      }
    }
  }
} satisfies Theme
