import '../lib/styles/bootstrap.css'
import './styles.css'

import { defineSetupVue3 } from '@histoire/plugin-vue'
import { createPinia } from 'pinia'
import Board from './_support/Board.vue'
import { setupRouter } from './_support/Utils'

export const setupVue3 = defineSetupVue3(({ app }) => {
  app.use(createPinia())

  app.component('Board', Board)

  setupRouter({ app })
})
