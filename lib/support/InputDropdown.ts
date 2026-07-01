// The dropdown option (text or avatar row) shared by SInputDropdown and
// SInputAsyncDropdown — the base choice option (InputOption) plus a render type.

import { type Option as BaseOption } from './InputOption'

export type Option<T = any> = OptionText<T> | OptionAvatar<T>

export interface OptionText<T = any> extends BaseOption<T> {
  type?: 'text'
}

export interface OptionAvatar<T = any> extends BaseOption<T> {
  type: 'avatar'
  image?: string | null
}
