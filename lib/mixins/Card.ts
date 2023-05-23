import { type App } from 'vue'
import SCard from '../components/SCard.vue'
import SCardBlock from '../components/SCardBlock.vue'
import SCardFooter from '../components/SCardFooter.vue'
import SCardFooterAction from '../components/SCardFooterAction.vue'
import SCardFooterActions from '../components/SCardFooterActions.vue'
import SCardHeader from '../components/SCardHeader.vue'
import SCardHeaderAction from '../components/SCardHeaderAction.vue'
import SCardHeaderActionClose from '../components/SCardHeaderActionClose.vue'
import SCardHeaderActionCollapse from '../components/SCardHeaderActionCollapse.vue'
import SCardHeaderActions from '../components/SCardHeaderActions.vue'
import SCardHeaderTitle from '../components/SCardHeaderTitle.vue'

export function mixin(app: App): void {
  app.mixin({
    components: {
      SCard,
      SCardBlock,
      SCardFooter,
      SCardFooterAction,
      SCardFooterActions,
      SCardHeader,
      SCardHeaderAction,
      SCardHeaderActionClose,
      SCardHeaderActionCollapse,
      SCardHeaderActions,
      SCardHeaderTitle
    }
  })
}
