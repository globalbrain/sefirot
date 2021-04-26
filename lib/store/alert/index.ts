import { ActionTree, ActionContext } from 'vuex'
import { Alert } from '../../composables/Alert'
import SAlert from '../../components/SAlert.vue'
import { State as RootState } from '../Sefirot'

export const actions: ActionTree<any, RootState> = {
  open(context: ActionContext<any, RootState>, alert: Alert): void {
    context.dispatch('modal/open', {
      component: SAlert,
      data: alert,
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
