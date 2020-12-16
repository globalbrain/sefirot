import { Store, Plugin } from 'vuex'
import modal, { State as ModalState } from './modal'
import dialog from './dialog'
import alert from './alert'
import window from './window'
import screen, { State as ScreenState } from './screen'
import snackbars, { State as SnackbarState } from './snackbars'

export interface State {
  modal: ModalState
  screen: ScreenState
  snackbars: SnackbarState
}

const Sefirot: Plugin<State> = <S = any> (store: Store<S & State>): void => {
  store.registerModule('modal', modal)
  store.registerModule('dialog', dialog)
  store.registerModule('alert', alert)
  store.registerModule('window', window)
  store.registerModule('screen', screen)
  store.registerModule('snackbars', snackbars)
}

export default Sefirot
