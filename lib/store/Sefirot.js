import modal from './modal'
import dialog from './dialog'
import snackbars from './snackbars'

export default function Sefirot (store) {
  store.registerModule('modal', modal)
  store.registerModule('dialog', dialog)
  store.registerModule('snackbars', snackbars)
}
