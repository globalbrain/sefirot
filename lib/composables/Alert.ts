import { Values } from '../types/Utils'
import { useStore } from './Store'
import { useModalUid } from './Modal'

export interface Alert {
  open(alert: AlertOptions): () => void
  close(): void
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
    store.dispatch('alert/open', { ...alert, uid })

    return close
  }

  function close() {
    store.dispatch('alert/close', uid)
  }

  return {
    open,
    close
  }
}
