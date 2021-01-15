import { ComputedRef } from '@vue/composition-api'
import { Values } from '../types/Utils'
import { Action } from './Action'
import { Dropdown, UseDropdownOptions, useDropdown } from './Dropdown'

export * from './Action'

export interface Header {
  size?: Size
  title?: string
  search?: Search
  actions?: Action[]
}

export type Size = Values<typeof Sizes>

export const Sizes = {
  Small: 'small',
  Medium: 'medium'
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
