import { type App } from 'vue'
import SSheet from '../components/SSheet.vue'
import SSheetFooter from '../components/SSheetFooter.vue'
import SSheetFooterAction from '../components/SSheetFooterAction.vue'
import SSheetFooterActions from '../components/SSheetFooterActions.vue'
import SSheetForm from '../components/SSheetForm.vue'
import SSheetMedium from '../components/SSheetMedium.vue'
import SSheetTitle from '../components/SSheetTitle.vue'

export function mixin(app: App): void {
  app.component('SSheet', SSheet)
  app.component('SSheetFooter', SSheetFooter)
  app.component('SSheetFooterAction', SSheetFooterAction)
  app.component('SSheetFooterActions', SSheetFooterActions)
  app.component('SSheetForm', SSheetForm)
  app.component('SSheetMedium', SSheetMedium)
  app.component('SSheetTitle', SSheetTitle)
}

declare module 'vue' {
  export interface GlobalComponents {
    SSheet: typeof SSheet
    SSheetFooter: typeof SSheetFooter
    SSheetFooterAction: typeof SSheetFooterAction
    SSheetFooterActions: typeof SSheetFooterActions
    SSheetForm: typeof SSheetForm
    SSheetMedium: typeof SSheetMedium
    SSheetTitle: typeof SSheetTitle
  }
}
