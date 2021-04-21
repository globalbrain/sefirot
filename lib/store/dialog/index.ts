import { ActionTree, ActionContext } from 'vuex'
import SDialog from '../../components/SDialog.vue'
import { State as RootState } from '../Sefirot'

export interface Options {
  type?: 'confirm' | 'loading' | 'progress'
  title?: string
  text?: string
  actions: Action[]
}

export interface Progress {
  now: number
  max: number
}

export interface Action {
  type?: 'primary' | 'mute'
  label: string
  callback(): void
}

export const actions: ActionTree<any, RootState> = {
  open(context: ActionContext<any, RootState>, options: Options): void {
    context.dispatch('modal/open', {
      component: SDialog,
      data: options,
      options: {
        closable: false
      }
    }, { root: true })
  },

  close(context: ActionContext<any, RootState>): void {
    context.dispatch('modal/close', null, { root: true })
  }

  // open(context: ActionContext<any, RootState>, { type = 'confirm', title, text, progress, actions = [] }: PayloadOpen): void {
  //   const data = { type, title, text, progress, actions }
  //   const name = `dialog-${JSON.stringify(data)}`

  //   context.dispatch('modal/open', { name, data }, { root: true })
  // },

  // update(context: ActionContext<any, RootState>, data: PayloadOpen): void {
  //   context.dispatch('modal/update', data, { root: true })
  // },

  // close(context: ActionContext<any, RootState>): void {
  //   context.dispatch('modal/close', null, { root: true })
  // }
}

export default {
  namespaced: true,
  actions
}
