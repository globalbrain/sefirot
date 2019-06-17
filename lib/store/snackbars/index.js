let nextId = 0

const maxItemSize = 4

export function state () {
  return {
    items: []
  }
}

export const actions = {
  push ({ commit }, { type, text, actions, timeout = 10000 }) {
    const id = nextId++

    commit('push', { id, type, text, actions })

    setTimeout(() => { commit('pop', id) }, timeout)
  },

  pop ({ commit }, id) {
    commit('pop', id)
  }
}

export const mutations = {
  push (state, item) {
    if (state.items.length > maxItemSize) {
      state.items.shift()
    }

    state.items.push(item)
  },

  pop (state, id) {
    state.items = state.items.filter(item => item.id !== id)
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
