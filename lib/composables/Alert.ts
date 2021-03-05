import { Values } from '../types/Utils'
import { ButtonAction } from './Action'

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

export function useAlert(alert: Alert): Alert {
  return alert
}
