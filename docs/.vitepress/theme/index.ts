import { createPinia } from 'pinia'
import { type Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { createMemoryHistory, createRouter, routerKey } from 'vue-router'

import 'sefirot/styles/variables.css'
import 'sefirot/styles/utilities.css'
import './styles.css'

import Board from './components/Board.vue'
import Layout from './components/Layout.vue'
import Showcase from './components/Showcase.vue'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.use(createPinia())
    app.provide(
      routerKey,
      createRouter({
        history: createMemoryHistory(),
        routes: [{ path: '/', component: { render: () => null } }]
      })
    )
    app.component('Showcase', Showcase)
    app.component('Board', Board)
  }
} satisfies Theme
