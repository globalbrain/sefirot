import { App } from 'vue'
import SSheet from '../components/SSheet.vue'
import SSheetHeader from '../components/SSheetHeader.vue'
import SSheetHeaderTitle from '../components/SSheetHeaderTitle.vue'
import SSheetMedium from '../components/SSheetMedium.vue'
import SSheetFooter from '../components/SSheetFooter.vue'
import SSheetFooterActions from '../components/SSheetFooterActions.vue'
import SSheetFooterAction from '../components/SSheetFooterAction.vue'

export function mixin(app: App): void {
  app.mixin({
    components: {
      SSheet,
      SSheetHeader,
      SSheetHeaderTitle,
      SSheetMedium,
      SSheetFooter,
      SSheetFooterActions,
      SSheetFooterAction
    }
  })
}
