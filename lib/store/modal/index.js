export function state () {
  return {
    name: null,
    data: {}
  }
}

export const actions = {
  open ({ commit }, { name, data }) {
    commit('set', { name, data })
  },

  update ({ commit }, data) {
    commit('updateData', data)
  },

  close ({ commit }) {
    commit('set', {
      name: null,
      data: {}
    })
  }
}

export const mutations = {
  set (state, { name, data }) {
    state.name = name
    state.data = data
  },

  updateData (state, data) {
    state.data = { ...state.data, ...data }
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
