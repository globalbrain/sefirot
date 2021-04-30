import { ActionTree, ActionContext } from 'vuex'
import SAlert from '../../components/SAlert.vue'
import { Alert } from '../../composables/Alert'
import { State as RootState } from '../Sefirot'

export type AlertPayload = Alert & { uid?: number }

export const actions: ActionTree<any, RootState> = {
  open(context: ActionContext<any, RootState>, alert: AlertPayload): void {
    const { uid } = alert
    delete alert.uid

    context.dispatch('modal/open', {
      uid,
      component: SAlert,
      data: alert,
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
