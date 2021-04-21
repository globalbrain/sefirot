import { shallowReactive, markRaw } from '@vue/composition-api'
import { GetterTree, ActionTree, ActionContext, MutationTree } from 'vuex'
import { State as RootState } from '../Sefirot'

export interface State {
  items: Item[]
}

export interface Item {
  component: any
  data?: Record<string, any>
  options?: Options
}

export interface Options {
  width?: string
  closable?: boolean
}

export function state(): State {
  return {
    items: []
  }
}

export const getters: GetterTree<State, RootState> = {
  // active(state: State): Item | null {
  //   if (state.name === null) {
  //     return null
  //   }

  //   return state.history.find(h => h.name === state.name)!
  // }
}

export const actions: ActionTree<State, RootState> = {
  open(context: ActionContext<State, RootState>, item: Item): void {
    context.commit('push', item)
  },

  close(context: ActionContext<State, RootState>): void {
    context.commit('pop')
  }

  // update(context: ActionContext<State, RootState>, data: Record<string, any>): void {
  //   context.commit('update', data)
  // },

  // close(context: ActionContext<State, RootState>): void {
  //   context.commit('back')
  //   setTimeout(() => { context.commit('pop') }, 250)
  // },

  // closeAll(context: ActionContext<State, RootState>): void {
  //   context.commit('reset')
  //   setTimeout(() => { context.commit('flush') }, 250)
  // }
}

export const mutations: MutationTree<State> = {
  push(state: State, item: Item): void {
    state.items.push({
      ...item,
      data: shallowReactive(item.data ?? {}),
      component: markRaw(item.component)
    })
  },

  pop(state: State): void {
    state.items.pop()
  }

  // push(state: State, { name, data = {} }: PayloadOpen): void {
  //   state.name === null ? (state.first = true) : (state.first = false)
  //   state.name = name
  //   state.history.push({ name, data })
  // },

  // update(state: State, data: Record<string, any>): void {
  //   const item = state.history.find(h => h.name === state.name)

  //   item && (item.data = { ...item.data, ...data })
  // },

  // back(state: State): void {
  //   const latestIndex = state.history.findIndex(h => h.name === state.name)
  //   const previousItem = state.history[latestIndex - 1]

  //   state.name = previousItem ? previousItem.name : null
  // },

  // reset(state: State): void {
  //   state.name = null
  // },

  // pop(state: State): void {
  //   state.history.pop()
  // },

  // flush(state: State): void {
  //   state.history = []
  // }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
