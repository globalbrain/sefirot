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
    context.dispatch('modal/open', {
      name: 'dialog',
      data: { type, title, text, progress, actions }
    }, { root: true })
  },

  update(context: ActionContext<any, RootState>, data): void {
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
