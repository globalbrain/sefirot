import { Values } from '../types/Utils'

export interface Card {
  header?: Header
  footer?: Footer
  mode?: Mode
  round?: number
  depth?: number
  collapsable?: boolean
}

export interface Header {
  title?: string
  actions?: Action[]
}

export interface Footer {
  actions: Action[]
}

export interface Action {
  type: 'primary' | 'secondary' | 'tertiary' | 'text' | 'mute'
  mode: Mode
  icon?: any
  label?: string
  callback?(): void
}

export type Mode = Values<typeof Modes>

export const Modes = {
  Neutral: 'neutral',
  Info: 'info',
  Success: 'success',
  Warning: 'warning',
  Danger: 'danger'
} as const

export function useCard(card: Card): Card {
  return card
}
