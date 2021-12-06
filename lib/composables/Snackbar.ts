import { useStore } from 'vuex'
import { Snackbar as SnackbarOptions } from '../store/snackbars'

export interface Snackbar {
  push(options: SnackbarOptions): void
}

export function useSnackbar(): Snackbar {
  const store = useStore()

  function push(options: SnackbarOptions): void {
    store.dispatch('snackbars/push', options)
  }

  return {
    push
  }
}
