import { type App } from 'vue'
import SHead from '../components/SHead.vue'
import SHeadLead from '../components/SHeadLead.vue'
import SHeadTitle from '../components/SHeadTitle.vue'

export function mixin(app: App): void {
  app.component('SHead', SHead)
  app.component('SHeadLead', SHeadLead)
  app.component('SHeadTitle', SHeadTitle)
}

declare module 'vue' {
  export interface GlobalComponents {
    SHead: typeof SHead
    SHeadLead: typeof SHeadLead
    SHeadTitle: typeof SHeadTitle
  }
}
