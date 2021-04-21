import { ActionTree, ActionContext } from 'vuex'
import { Dialog } from '../../composables/Dialog'
import SDialog from '../../components/SDialog.vue'
import { State as RootState } from '../Sefirot'

export const actions: ActionTree<any, RootState> = {
  open(context: ActionContext<any, RootState>, dialog: Dialog): void {
    context.dispatch('modal/open', {
      component: SDialog,
      data: dialog,
      options: {
        closable: false
      }
    }, { root: true })
  },

  close(context: ActionContext<any, RootState>): void {
    context.dispatch('modal/close', null, { root: true })
  }
}

export default {
  namespaced: true,
  actions
}
