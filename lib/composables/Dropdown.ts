import { MaybeRef, useElementBounding, useWindowSize } from '@vueuse/core'
import { Ref, ref, unref } from 'vue'

export type DropdownSection =
  | DropdownSectionMenu
  | DropdownSectionFilter
  | DropdownSectionComponent

export type DropdownSectionType = 'menu' | 'filter' | 'component'

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
  options: MaybeRef<DropdownSectionFilterOption[]>
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

export interface DropdownSectionComponent extends DropdownSectionBase {
  type: 'component'
  component: any
}

export interface ManualDropdownPosition {
  container: Ref<any>
  position: Ref<'top' | 'bottom'>
  update(): void
}

export function createDropdown(section: DropdownSection[]): DropdownSection[] {
  return section
}

export function useManualDropdownPosition(
  container?: Ref<any>,
  initPosition?: 'top' | 'bottom'
): ManualDropdownPosition {
  const el = container ?? ref<any>(null)

  const { top, bottom } = useElementBounding(el)
  const { height } = useWindowSize()

  const position = ref<'top' | 'bottom'>(initPosition ?? 'bottom')

  const dialogHeight = 400

  function update(): void {
    if (initPosition) {
      return
    }

    // If the space top of the input is not enough to show dialog, just show
    // the dialog at the bottom of the input.
    if (top.value < dialogHeight) {
      position.value = 'bottom'
      return
    }

    // Else show dialog depending on the space bottom of the input.
    if (bottom.value + dialogHeight <= height.value) {
      position.value = 'bottom'
      return
    }

    position.value = 'top'
  }

  return {
    container: el,
    position,
    update
  }
}

export function getSelectedOption(
  sections: DropdownSection[]
): DropdownSectionFilterOption | null {
  for (const section of sections) {
    if (section.type === 'filter') {
      const options = unref(section.options)
      const selected = unref(section.selected)

      for (const option of options) {
        if (option.value === selected) {
          return option
        }
      }
    }
  }

  return null
}
