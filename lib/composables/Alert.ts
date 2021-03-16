import { Values } from '../types/Utils'
import { ButtonAction } from './Action'
import { useStore } from './Store'

export interface Alert {
  type?: AlertMode
  title: string
  text: string
  actions: ButtonAction[]
}

export type AlertMode = Values<typeof AlertModes>

export const AlertModes = {
  Info: 'info',
  Success: 'success',
  Warning: 'warning',
  Danger: 'danger'
} as const

export function useAlert(alert: Alert) {
  const store = useStore()

  function open(): void {
    store.dispatch('alert/open', alert)
  }

  function close(): void {
    store.dispatch('alert/close')
  }

  return {
    open,
    close
  }
}
