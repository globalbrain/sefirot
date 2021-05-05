import { ActionTree, ActionContext } from 'vuex'
import SDialog from '../../components/SDialog.vue'
import { Dialog } from '../../composables/Dialog'
import { State as RootState } from '../Sefirot'

export type DialogPayload = Dialog & { uid?: number }

export const actions: ActionTree<any, RootState> = {
  open(context: ActionContext<any, RootState>, dialog: DialogPayload): void {
    const { uid } = dialog

    delete dialog.uid

    context.dispatch('modal/open', {
      uid,
      component: SDialog,
      data: dialog,
      options: {
        closable: false
      }
    }, { root: true })
  },

  close(context: ActionContext<any, RootState>, uid?: number): void {
    context.dispatch('modal/close', uid, { root: true })
  }
}

export default {
  namespaced: true,
  actions
}
