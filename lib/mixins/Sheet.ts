import { App } from 'vue'
import SSheet from '../components/SSheet.vue'
import SSheetFooter from '../components/SSheetFooter.vue'
import SSheetFooterAction from '../components/SSheetFooterAction.vue'
import SSheetFooterActions from '../components/SSheetFooterActions.vue'
import SSheetMedium from '../components/SSheetMedium.vue'
import SSheetTitle from '../components/SSheetTitle.vue'
import SSheetForm from '../components/SSheetForm.vue'

export function mixin(app: App): void {
  app.mixin({
    components: {
      SSheet,
      SSheetTitle,
      SSheetMedium,
      SSheetForm,
      SSheetFooter,
      SSheetFooterActions,
      SSheetFooterAction
    }
  })
}
