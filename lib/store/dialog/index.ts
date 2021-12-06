import { ActionTree, ActionContext } from 'vuex'
import SDialog from '../../components/SDialog.vue'

export interface OpenPayload {
  id?: number
  type?: 'confirm' | 'loading'
  title?: string
  text?: string
  actions?: Action[]
}

export interface Action {
  type?: 'text' | 'mute'
  label: string
  callback(): void
}

export const actions: ActionTree<any, any> = {
  open(context: ActionContext<any, any>, payload: OpenPayload): void {
    const { id } = payload

    delete payload.id

    context.dispatch('modal/open', {
      id,
      component: SDialog,
      data: payload,
      options: {
        closable: false
      }
    }, { root: true })
  },

  close(context: ActionContext<any, any>, uid?: number): void {
    context.dispatch('modal/close', uid, { root: true })
  }
}

export default {
  namespaced: true,
  actions
}
