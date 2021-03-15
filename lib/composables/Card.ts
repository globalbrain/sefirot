import { Values } from '../types/Utils'
import { Refish } from './Utils'
import { Header } from './Header'
import { Action } from './Action'

export * from './Header'
export * from './Action'

export interface Card {
  size?: Size
  border?: Mode
  header?: Header
  footer?: Footer
  round?: number
  depth?: number
  collapsable?: boolean
  loading?: Refish<boolean>
}

export type Size = Values<typeof Sizes>

export const Sizes = {
  Compact: 'compact',
  Wide: 'wide'
} as const

export type Mode = Values<typeof Modes>

export const Modes = {
  Info: 'info',
  Success: 'success',
  Warning: 'warning',
  Danger: 'danger'
} as const

export interface Footer {
  actions: Action[]
}

export function useCard(card: Card): Card {
  return card
}

export function useFooter(footer: Footer): Footer {
  return footer
}
