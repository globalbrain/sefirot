import { type Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'

import 'sefirot/styles/variables.css'
import 'sefirot/styles/utilities.css'
import './styles.css'

import Layout from './components/Layout.vue'
import Showcase from './components/Showcase.vue'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.component('Showcase', Showcase)
  }
} satisfies Theme
