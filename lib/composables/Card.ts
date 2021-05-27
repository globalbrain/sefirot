import { Values } from '../types/Utils'
import { Refish } from './Utils'

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
  actions?: Refish<Action[]>
}

export interface Footer {
  actions: Refish<Action[]>
}

export interface Action {
  type: 'primary' | 'secondary' | 'tertiary' | 'text' | 'mute'
  mode?: Mode
  icon?: ActionIconType | object
  label?: string
  link?: string
  disabled?: string | null
  callback?(): void
}

export type ActionIconType = 'edit-3' | 'plus' | 'trash-2'

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
