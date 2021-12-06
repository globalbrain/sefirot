import { Store, Plugin } from 'vuex'
import modal, { State as ModalState } from './modal'
import dialog from './dialog'
import snackbars, { State as SnackbarsState } from './snackbars'

export interface State {
  modal: ModalState
  snackbars: SnackbarsState
}

export function Sefirot<S = any>(): Plugin<S> {
  return (store) => {
    store.registerModule('modal', modal)
    store.registerModule('dialog', dialog)
    store.registerModule('snackbars', snackbars)
  }
}
