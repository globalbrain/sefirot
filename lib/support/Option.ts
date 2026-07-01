// The option shape shared by the dropdown-style inputs (SInputDropdown,
// SInputSelectSearch, …) and anything that renders their selection. An option is
// either a plain text row or an avatar row, identified by its `value`. The value
// type is generic — inputs keyed by their value (SInputDropdown) parameterize it;
// others leave it as the default `any`.

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
