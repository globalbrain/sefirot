import { Plugin } from 'vuex'
import dialog from './dialog'
import modal, { State as ModalState } from './modal'

export interface State {
  modal: ModalState
}

export function Sefirot<S = any>(): Plugin<S> {
  return (store) => {
    store.registerModule('modal', modal)
    store.registerModule('dialog', dialog)
  }
}
