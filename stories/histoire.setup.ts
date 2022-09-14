import '../lib/styles/bootstrap.css'
import './styles.css'

import { defineSetupVue3 } from '@histoire/plugin-vue'
import { createPinia } from 'pinia'
import { createStore } from 'vuex'
import { Sefirot } from '../lib/store/Sefirot'

export const setupVue3 = defineSetupVue3(({ app }) => {
  app.use(createPinia())

  app.use(createStore({
    plugins: [Sefirot()]
  }))
})
