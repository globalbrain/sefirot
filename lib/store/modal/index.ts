import { ActionTree, ActionContext, MutationTree } from 'vuex'
import { State as RootState } from '../Sefirot'

export interface State {
  id: number
  name: string | null
  data: Record<string, any>
}

export interface PayloadOpen {
  name: string
  data?: Record<string, any>
}

export function state(): State {
  return {
    id: 0,
    name: null,
    data: {}
  }
}

export const actions: ActionTree<State, RootState> = {
  open(context: ActionContext<State, RootState>, { name, data }: PayloadOpen): void {
    context.commit('set', { name, data })
  },

  update(context: ActionContext<State, RootState>, data: Record<string, any>): void {
    context.commit('update', data)
  },

  close(context: ActionContext<State, RootState>): void {
    context.commit('delete')
  }
}

export const mutations: MutationTree<State> = {
  set(state: State, { name, data = {} }: PayloadOpen): void {
    state.id++
    state.name = name
    state.data = data
  },

  update(state: State, data: Record<string, any>): void {
    state.data = { ...state.data, ...data }
  },

  delete(state: State): void {
    state.id = 0
    state.name = null
    state.data = {}
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
