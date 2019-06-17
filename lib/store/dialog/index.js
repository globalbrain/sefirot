export const actions = {
  open ({ dispatch }, { type = 'confirm', title, text, progress, actions }) {
    dispatch('modal/open', {
      name: 'dialog',
      data: { type, title, text, progress, actions }
    }, { root: true })
  },

  update ({ dispatch }, data) {
    dispatch('modal/update', data, { root: true })
  },

  close ({ dispatch }) {
    dispatch('modal/close', null, { root: true })
  }
}

export default {
  namespaced: true,
  actions
}
