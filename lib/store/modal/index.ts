import { shallowReactive, markRaw } from '@vue/composition-api'
import { ActionTree, ActionContext, MutationTree } from 'vuex'
import { State as RootState } from '../Sefirot'

export interface State {
  items: Item[]
}

export interface Item {
  component: any
  data?: Record<string, any>
  options?: Options
  uid?: number
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

export const actions: ActionTree<State, RootState> = {
  open(context: ActionContext<State, RootState>, item: Item): void {
    context.commit('push', item)
  },

  close(context: ActionContext<State, RootState>, uid?: number): void {
    if (uid) {
      context.commit('drop', uid)
      return
    }

    context.commit('pop')
  },

  closeAll(context: ActionContext<State, RootState>): void {
    context.commit('flush')
  }
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
  },

  drop(state: State, uid: number) {
    state.items = state.items.filter(item => item.uid !== uid)
  },

  flush(state: State): void {
    state.items = []
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
