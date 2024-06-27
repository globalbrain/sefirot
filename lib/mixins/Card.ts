import { type App } from 'vue'
import SCard from '../components/SCard.vue'
import SCardBlock from '../components/SCardBlock.vue'

export function mixin(app: App): void {
  app.component('SCard', SCard)
  app.component('SCardBlock', SCardBlock)
}

declare module 'vue' {
  export interface GlobalComponents {
    SCard: typeof SCard
    SCardBlock: typeof SCardBlock
  }
}
