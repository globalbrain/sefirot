import { Values, OmitType } from '../types/Utils'

export type Action = Values<Actions>

export interface Actions {
  ButtonAction: ButtonAction
}

export interface ActionBase {
  type: Type
  size?: Size
  callback?(): void
}

export type Type = Values<typeof Types>

export const Types = {
  Button: 'button'
} as const

export type Size = Values<typeof Sizes>

export const Sizes = {
  Small: 'small',
  Medium: 'medium'
} as const

export interface ButtonAction extends ActionBase {
  type: typeof Types.Button
  kind?: ButtonActionKind
  mode?: ButtonActionMode
  icon?: any
  label?: string
  link?: string
  rounded?: boolean
  inverse?: boolean
  loading?: boolean
}

export type ButtonActionKind = Values<typeof ButtonActionKinds>

export const ButtonActionKinds = {
  Primary: 'primary',
  Secondary: 'secondary',
  Tertiary: 'tertiary',
  Text: 'text',
  Mute: 'mute'
} as const

export type ButtonActionMode = Values<typeof ButtonActionModes>

export const ButtonActionModes = {
  Neutral: 'neutral',
  Info: 'info',
  Success: 'success',
  Warning: 'warning',
  Danger: 'danger'
} as const

export function useAction<T extends Action>(action: T): T {
  return action
}

export function useButtonAction(action: OmitType<ButtonAction>): ButtonAction {
  return { type: Types.Button, ...action }
}
