import { Values } from '../types/Utils'

export interface Dialog {
  type?: DialogType
  title?: string
  text?: string
  actions?: Action[]
}

export type DialogType = Values<typeof DialogTypes>

export const DialogTypes = {
  Confirm: 'confirm',
  Loading: 'loading'
} as const

export interface Action {
  type?: 'primary' | 'mute'
  label: string
  callback(): void
}
