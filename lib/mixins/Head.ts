import { type App } from 'vue'
import SHead from '../components/SHead.vue'
import SHeadLead from '../components/SHeadLead.vue'
import SHeadTitle from '../components/SHeadTitle.vue'

export function mixin(app: App): void {
  app.mixin({
    components: {
      SHead,
      SHeadLead,
      SHeadTitle
    }
  })
}
