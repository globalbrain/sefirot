import { Values, OmitType } from '../types/Utils'

export type Action = Values<Actions>

export interface Actions {
  ButtonAction: ButtonAction
  PillAction: PillAction
  AvatarAction: AvatarAction
  SwitchAction: SwitchAction
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
  Avatar: 'avatar',
  Pill: 'pill',
  Switch: 'switch'
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

export interface PillAction extends ActionBase {
  type: typeof Types.Pill
  mode?: PillActionMode
  label: string
}

export type PillActionMode = Values<typeof PillActionModes>

export const PillActionModes = {
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

export interface SwitchAction extends ActionBase {
  type: typeof Types.Switch
  value: boolean
  mode?: SwitchActionMode
  text?: string
  textMode?: SwitchActionTextMode
}

export type SwitchActionMode = Values<typeof SwitchActionModes>

export const SwitchActionModes = {
  Neutral: 'neutral',
  Info: 'info',
  Success: 'success',
  Warning: 'warning',
  Danger: 'danger'
} as const

export type SwitchActionTextMode = Values<typeof SwitchActionTextModes>

export const SwitchActionTextModes = {
  Neutral: 'neutral',
  Mute: 'mute',
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

export function usePillAction(action: OmitType<PillAction>): PillAction {
  return { type: Types.Pill, ...action }
}

export function useAvatarAction(action: OmitType<AvatarAction>): AvatarAction {
  return { type: Types.Avatar, ...action }
}

export function useSwitchAction(action: OmitType<SwitchAction>): SwitchAction {
  return { type: Types.Switch, ...action }
}
