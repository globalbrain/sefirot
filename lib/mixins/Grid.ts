import { type App } from 'vue'
import SGrid from '../components/SGrid.vue'
import SGridItem from '../components/SGridItem.vue'

export function mixin(app: App): void {
  app.mixin({
    components: {
      SGrid,
      SGridItem
    }
  })
}
