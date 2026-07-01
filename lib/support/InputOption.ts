// The label + value option shape shared by the choice-list inputs (SInputSelect,
// SInputCheckboxes, SInputRadios, SInputSegments, SInputSwitches).

export interface Option<T = any> {
  label: string
  value: T
  disabled?: boolean
}
