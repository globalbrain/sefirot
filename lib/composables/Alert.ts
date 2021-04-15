import { Values } from '../types/Utils'
import { useStore } from './Store'

export interface Alert {
  type?: AlertMode
  title: string
  text: string
  actions: Action[]
}

export type AlertMode = Values<typeof AlertModes>

export const AlertModes = {
  Info: 'info',
  Success: 'success',
  Warning: 'warning',
  Danger: 'danger'
} as const

export interface Action {
  type: 'primary' | 'secondary' | 'tertiary' | 'text' | 'mute'
  mode: 'neutral' | 'info' | 'success' | 'warning' | 'danger'
  icon?: any
  label: string
  callback(): void
}

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
