import { Values } from '../types/Utils'

export interface Tag {
  size?: Size
  mode?: Mode
  icon?: any
  text?: string
  link?: string
}

export type Size = Values<typeof Sizes>

export const Sizes = {
  Small: 'small',
  Medium: 'medium',
  Large: 'large'
} as const

export type Mode = Values<typeof Modes>

export const Modes = {
  Neutral: 'neutral',
  Info: 'info',
  Success: 'success',
  Warning: 'warning',
  Danger: 'danger',
  Mute: 'mute'
} as const

export function useTag(tag: Tag): Tag {
  return tag
}
