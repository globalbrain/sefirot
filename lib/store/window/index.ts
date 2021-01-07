import { ActionTree, ActionContext } from 'vuex'
import { State as RootState } from '../Sefirot'

interface PayloadOpen {
  name: string
}

export const actions: ActionTree<any, RootState> = {
  open(context: ActionContext<any, RootState>, { name }: PayloadOpen): void {
    context.dispatch('modal/open', { name }, { root: true })
  },

  close(context: ActionContext<any, RootState>): void {
    context.dispatch('modal/close', null, { root: true })
  }
}

export default {
  namespaced: true,
  actions
}
