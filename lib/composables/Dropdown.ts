import { MaybeRef } from '@vueuse/core'

export type DropdownSection =
  | DropdownSectionMenu
  | DropdownSectionFilter

export type DropdownSectionType = 'menu' | 'filter'

export interface DropdownSectionBase {
  type: DropdownSectionType
}

export interface DropdownSectionMenu extends DropdownSectionBase {
  type: 'menu'
  options: DropdownSectionMenuOption[]
}

export interface DropdownSectionMenuOption {
  label: string
  onClick(): void
}

export interface DropdownSectionFilter extends DropdownSectionBase {
  type: 'filter'
  search?: boolean
  selected: MaybeRef<DropdownSectionFilterSelectedValue>
  options: DropdownSectionFilterOption[]
  onClick?(value: string | number | boolean): void
}

export type DropdownSectionFilterSelectedValue =
  | string
  | number
  | boolean
  | null
  | (string | number | boolean)[]

export type DropdownSectionFilterOption =
  | DropdownSectionFilterOptionText
  | DropdownSectionFilterOptionAvatar

export interface DropdownSectionFilterOptionBase {
  type?: 'text' | 'avatar'
  label: string
  value: string | number | boolean
  onClick?(value: string | number | boolean): void
}

export interface DropdownSectionFilterOptionText extends DropdownSectionFilterOptionBase {
  type?: 'text'
}

export interface DropdownSectionFilterOptionAvatar extends DropdownSectionFilterOptionBase {
  type: 'avatar'
  image?: string | null
}

export function createDropdown(section: DropdownSection[]): DropdownSection[] {
  return section
}
