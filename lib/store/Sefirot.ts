import { Store } from 'vuex'
import modal from './modal'
import dialog from './dialog'
import alert from './alert'
import window from './window'
import screen from './screen'
import snackbars, { State as SnackbarState } from './snackbars'

export interface State {
  snackbars: SnackbarState
}

export default function Sefirot (store: Store<State>): void {
  store.registerModule('modal', modal)
  store.registerModule('dialog', dialog)
  store.registerModule('alert', alert)
  store.registerModule('window', window)
  store.registerModule('screen', screen)
  store.registerModule('snackbars', snackbars)
}
