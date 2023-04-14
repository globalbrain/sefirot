import { Theme } from 'vitepress'
import VitePressTheme from 'vitepress/theme'

import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'
import 'sefirot/styles/variables.css'
import './styles.css'

import Showcase from './components/Showcase.vue'

export default <Theme>{
  ...VitePressTheme,
  enhanceApp(ctx) {
    VitePressTheme.enhanceApp(ctx)

    ctx.app.component('Showcase', Showcase)
  }
}
