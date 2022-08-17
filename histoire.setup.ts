import './lib/assets/styles/bootstrap.css'
import { createStore } from 'vuex'
import { Sefirot } from './lib/store/Sefirot'


export function setupVue3({ app }) {
  app.use(createStore({
    plugins: [Sefirot()]
  }))
}
