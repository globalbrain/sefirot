export const actions = {
  open ({ dispatch }, { type = 'info', title, text, actions }) {
    dispatch('modal/open', {
      name: 'alert',
      data: { type, title, text, actions }
    }, { root: true })
  },

  close ({ dispatch }) {
    dispatch('modal/close', null, { root: true })
  }
}

export default {
  namespaced: true,
  actions
}
