import { ComputedRef } from '@vue/composition-api'
import { Values } from '../types/Utils'
import { Refish } from './Utils'
import { Action } from './Action'
import { Tag } from './Tag'
import { Dropdown, UseDropdownOptions, useDropdown } from './Dropdown'

export * from './Action'
export * from './Tag'

export interface Header {
  size?: Size
  mode?: Mode
  icon?: any
  title?: Refish<string>
  search?: Search
  actions?: Refish<Action[]>
  tags?: Refish<Tag[]>
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
  Danger: 'danger'
} as const

export interface Search {
  placeholder: string
  presets?: SearchPresets
  value: ComputedRef<string>
  onEnter(text: string): void
}

export interface SearchPresets {
  title: string
  dropdown: Dropdown
}

export interface UseSearchPresetsOptions {
  title: string
  dropdown: UseDropdownOptions
}

export function useHeader(header: Header): Header {
  return header
}

export function useSearch(search: Search): Search {
  return search
}

export function useSearchPresets(presets: UseSearchPresetsOptions): SearchPresets {
  return {
    title: presets.title,
    dropdown: useDropdown({
      closeOnClick: true,
      ...presets.dropdown
    })
  }
}
