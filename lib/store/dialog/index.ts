import { ActionTree, ActionContext } from 'vuex'
import { State as RootState } from '../Sefirot'

export interface PayloadOpen {
  type?: 'confirm' | 'loading' | 'progress'
  title?: string
  text?: string
  progress?: Progress
  actions: Action[]
}

export interface Progress {
  now: number
  max: number
}

export interface Action {
  type?: 'primary' | 'mute'
  label: string
  callback: Function
}

export const actions: ActionTree<any, RootState> = {
  open(context: ActionContext<any, RootState>, { type = 'confirm', title, text, progress, actions = [] }: PayloadOpen): void {
    const data = { type, title, text, progress, actions }
    const name = `dialog-${JSON.stringify(data)}`

    context.dispatch('modal/open', { name, data }, { root: true })
  },

  update(context: ActionContext<any, RootState>, data: PayloadOpen): void {
    context.dispatch('modal/update', data, { root: true })
  },

  close(context: ActionContext<any, RootState>): void {
    context.dispatch('modal/close', null, { root: true })
  }
}

export default {
  namespaced: true,
  actions
}
