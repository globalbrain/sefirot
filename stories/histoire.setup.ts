import '../lib/styles/bootstrap.css'
import './styles.css'

import { defineSetupVue3 } from '@histoire/plugin-vue'
import { createPinia } from 'pinia'

export const setupVue3 = defineSetupVue3(({ app }) => {
  app.use(createPinia())
})
