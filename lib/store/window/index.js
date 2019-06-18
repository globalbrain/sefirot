export const actions = {
  open ({ dispatch }, { name }) {
    dispatch('modal/open', { name }, { root: true })
  },

  close ({ dispatch }) {
    dispatch('modal/close', null, { root: true })
  }
}

export default {
  namespaced: true,
  actions
}
