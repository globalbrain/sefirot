import { Values } from '../types/Utils'
import { useStore } from './Store'
import { useModalUid } from './Modal'

export interface Alert {
  open(alert: AlertOptions): Promise<any>
  close(): Promise<any>
}

export interface AlertOptions {
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

export function useAlert(): Alert {
  const store = useStore()
  const uid = useModalUid()

  function open(alert: AlertOptions) {
    return store.dispatch('alert/open', { ...alert, uid })
  }

  function close() {
    return store.dispatch('alert/close', uid)
  }

  return {
    open,
    close
  }
}
