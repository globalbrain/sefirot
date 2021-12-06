import { ActionTree, ActionContext, MutationTree } from 'vuex'

let nextId: number = 0

const maxItemSize: number = 4

export interface State {
  items: SnackbarWithId[]
}

export interface Snackbar {
  text: string
  timeout?: number
  actions?: Action[]
}

export interface SnackbarWithId extends Snackbar {
  id: number
}

export interface Action {
  type: 'primary' | 'secondary' | 'tertiary' | 'text' | 'mute'
  label: string
  callback: Function
}

export function state(): State {
  return {
    items: []
  }
}

export const actions: ActionTree<State, any> = {
  push(context: ActionContext<State, any>, payload: Snackbar): void {
    const id = nextId++

    context.commit('push', {
      id,
      text: payload.text,
      actions: payload.actions
    })

    setTimeout(() => { context.commit('pop', id) }, payload.timeout ?? 10000)
  },

  pop(context: ActionContext<State, any>, id: number): void {
    context.commit('pop', id)
  }
}

export const mutations: MutationTree<State> = {
  push(state: State, item: SnackbarWithId): void {
    if (state.items.length > maxItemSize) {
      state.items.shift()
    }

    state.items.push(item)
  },

  pop(state: State, id: number): void {
    state.items = state.items.filter(item => item.id !== id)
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
