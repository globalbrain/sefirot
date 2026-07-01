// The option shape shared by the dropdown-style inputs (SInputDropdown,
// SInputSelectSearch, …) and anything that renders their selection. An option is
// either a plain text row or an avatar row, identified by its `value`.

export type OptionValue = any

export type Option = OptionText | OptionAvatar

export interface OptionBase {
  type?: 'text' | 'avatar'
  value: OptionValue
  disabled?: boolean
}

export interface OptionText extends OptionBase {
  type?: 'text'
  label: string
}

export interface OptionAvatar extends OptionBase {
  type: 'avatar'
  label: string
  image?: string | null
}
