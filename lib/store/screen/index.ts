import { ActionTree, ActionContext, MutationTree } from 'vuex'
import { State as RootState } from '../Sefirot'

export interface State {
  name: string | null
  data: Record<string, any>
}

export interface PayloadOpen {
  name: string
  data?: Record<string, any>
}

export function state (): State {
  return {
    name: null,
    data: {}
  }
}

export const actions: ActionTree<State, RootState> = {
  open (context: ActionContext<State, RootState>, { name, data }: PayloadOpen): void {
    context.commit('set', { name, data })
  },

  close (context: ActionContext<State, RootState>): void {
    context.commit('set', {
      name: null,
      data: {}
    })
  }
}

export const mutations: MutationTree<State> = {
  set (state: State, { name, data = {} }: PayloadOpen): void {
    state.name = name
    state.data = data
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
