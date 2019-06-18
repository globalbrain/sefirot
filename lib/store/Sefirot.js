import modal from './modal'
import dialog from './dialog'
import alert from './alert'
import window from './window'
import snackbars from './snackbars'

export default function Sefirot (store) {
  store.registerModule('modal', modal)
  store.registerModule('dialog', dialog)
  store.registerModule('alert', alert)
  store.registerModule('window', window)
  store.registerModule('snackbars', snackbars)
}
