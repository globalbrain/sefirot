import { GetterTree, ActionTree, ActionContext, MutationTree } from 'vuex'
import { State as RootState } from '../Sefirot'

export interface State {
  name: string | null
  history: Item[]
  first: boolean
}

export interface Item {
  name: string
  data: Record<string, any>
}

export interface PayloadOpen {
  name: string
  data?: Record<string, any>
}

export function state(): State {
  return {
    name: null,
    history: [],
    first: true
  }
}

export const getters: GetterTree<State, RootState> = {
  active(state: State): Item | null {
    if (state.name === null) {
      return null
    }

    return state.history.find(h => h.name === state.name)!
  }
}

export const actions: ActionTree<State, RootState> = {
  open(context: ActionContext<State, RootState>, item: PayloadOpen): void {
    context.commit('push', item)
  },

  update(context: ActionContext<State, RootState>, data: Record<string, any>): void {
    context.commit('update', data)
  },

  close(context: ActionContext<State, RootState>): void {
    context.commit('back')
    setTimeout(() => { context.commit('pop') }, 250)
  },

  closeAll(context: ActionContext<State, RootState>): void {
    context.commit('reset')
    setTimeout(() => { context.commit('flush') }, 250)
  }
}

export const mutations: MutationTree<State> = {
  push(state: State, { name, data = {} }: PayloadOpen): void {
    state.name === null ? (state.first = true) : (state.first = false)
    state.name = name
    state.history.push({ name, data })
  },

  update(state: State, data: Record<string, any>): void {
    const item = state.history.find(h => h.name === state.name)

    item && (item.data = { ...item.data, ...data })
  },

  back(state: State): void {
    const latestItem = state.history[state.history.length - 2]

    state.name = latestItem ? latestItem.name : null
  },

  reset(state: State): void {
    state.name = null
  },

  pop(state: State): void {
    state.history.pop()
  },

  flush(state: State): void {
    state.history = []
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
