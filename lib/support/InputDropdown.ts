// The option shape (text or avatar row) shared by the dropdown inputs
// (SInputDropdown, SInputAsyncDropdown). The value type is generic, default `any`.

export type Option<T = any> = OptionText<T> | OptionAvatar<T>

export interface OptionBase<T = any> {
  type?: 'text' | 'avatar'
  value: T
  disabled?: boolean
}

export interface OptionText<T = any> extends OptionBase<T> {
  type?: 'text'
  label: string
}

export interface OptionAvatar<T = any> extends OptionBase<T> {
  type: 'avatar'
  label: string
  image?: string | null
}
