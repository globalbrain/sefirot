export function state () {
  return {
    id: 0,
    name: null,
    data: {}
  }
}

export const actions = {
  open ({ commit }, { name, data = {} }) {
    commit('set', { name, data })
  },

  update ({ commit }, data) {
    commit('update', data)
  },

  close ({ commit }) {
    commit('delete')
  }
}

export const mutations = {
  set (state, { name, data }) {
    state.id++
    state.name = name
    state.data = data
  },

  update (state, data) {
    state.data = { ...state.data, ...data }
  },

  delete (state) {
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
