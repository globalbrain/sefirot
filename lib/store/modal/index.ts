import { shallowReactive, markRaw } from 'vue'
import { ActionTree, ActionContext, MutationTree } from 'vuex'

export interface State {
  items: Item[]
}

export interface Item {
  id?: number
  component: any
  data?: Record<string, any>
  options?: Options
}

export interface Options {
  closable?: boolean
}

function state(): State {
  return {
    items: []
  }
}

const actions: ActionTree<State, any> = {
  open(context: ActionContext<State, any>, item: Item): void {
    context.commit('push', item)
  },

  close(context: ActionContext<State, any>, id?: number): void {
    id ? context.commit('drop', id) : context.commit('pop')
  },

  closeAll(context: ActionContext<State, any>): void {
    context.commit('flush')
  }
}

const mutations: MutationTree<State> = {
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

  drop(state: State, id: number) {
    state.items = state.items.filter(item => item.id !== id)
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
