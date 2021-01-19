import { Values } from '../types/Utils'
import { Header } from './Header'
import { Action } from './Action'

export * from './Header'
export * from './Action'

export interface Card {
  size?: Size
  border?: Mode
  header?: Header
  modules?: Module[]
  footer?: Footer
  round?: number
  depth?: number
  collapsable?: boolean
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

export interface Module {
  component: any
  data?: Record<string, any>
}

export interface Footer {
  actions: Action[]
}

export function useCard(card: Card): Card {
  return card
}

export function useModule(module: Module): Module {
  return module
}

export function useFooter(footer: Footer): Footer {
  return footer
}
