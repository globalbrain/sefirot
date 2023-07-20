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
  app.component('SCard', SCard)
  app.component('SCardBlock', SCardBlock)
  app.component('SCardFooter', SCardFooter)
  app.component('SCardFooterAction', SCardFooterAction)
  app.component('SCardFooterActions', SCardFooterActions)
  app.component('SCardHeader', SCardHeader)
  app.component('SCardHeaderAction', SCardHeaderAction)
  app.component('SCardHeaderActionClose', SCardHeaderActionClose)
  app.component('SCardHeaderActionCollapse', SCardHeaderActionCollapse)
  app.component('SCardHeaderActions', SCardHeaderActions)
  app.component('SCardHeaderTitle', SCardHeaderTitle)
}

declare module 'vue' {
  export interface GlobalComponents {
    SCard: typeof SCard
    SCardBlock: typeof SCardBlock
    SCardFooter: typeof SCardFooter
    SCardFooterAction: typeof SCardFooterAction
    SCardFooterActions: typeof SCardFooterActions
    SCardHeader: typeof SCardHeader
    SCardHeaderAction: typeof SCardHeaderAction
    SCardHeaderActionClose: typeof SCardHeaderActionClose
    SCardHeaderActionCollapse: typeof SCardHeaderActionCollapse
    SCardHeaderActions: typeof SCardHeaderActions
    SCardHeaderTitle: typeof SCardHeaderTitle
  }
}
