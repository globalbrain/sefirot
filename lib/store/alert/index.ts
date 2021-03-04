import { ActionTree, ActionContext } from 'vuex'
import { State as RootState } from '../Sefirot'

export const actions: ActionTree<any, RootState> = {
  open(context: ActionContext<any, RootState>, { type = 'info', title, text, actions }): void {
    context.dispatch('modal/open', {
      name: 'alert',
      data: { type, title, text, actions }
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
