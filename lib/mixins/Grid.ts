import { type App } from 'vue'
import SGrid from '../components/SGrid.vue'
import SGridItem from '../components/SGridItem.vue'

export function mixin(app: App): void {
  app.component('SGrid', SGrid)
  app.component('SGridItem', SGridItem)
}

declare module 'vue' {
  export interface GlobalComponents {
    SGrid: typeof SGrid
    SGridItem: typeof SGridItem
  }
}
