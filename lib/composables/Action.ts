import { Values, OmitType } from '../types/Utils'

export type Action = Values<Actions>

export interface Actions {
  ButtonAction: ButtonAction
  AvatarAction: AvatarAction
}

export interface ActionBase {
  type: Type
  size?: Size
  gap?: number
  callback?(): void
}

export type Type = Values<typeof Types>

export const Types = {
  Button: 'button',
  Avatar: 'avatar'
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

export interface AvatarAction extends ActionBase {
  type: typeof Types.Avatar
  avatars: AvatarActionAvatar[]
}

export interface AvatarActionAvatar {
  avatar: string
  name?: string
}

export function useAction<T extends Action>(action: T): T {
  return action
}

export function useButtonAction(action: OmitType<ButtonAction>): ButtonAction {
  return { type: Types.Button, ...action }
}

export function useAvatarAction(action: OmitType<AvatarAction>): AvatarAction {
  return { type: Types.Avatar, ...action }
}
