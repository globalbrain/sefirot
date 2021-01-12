import Fuse from 'fuse.js'
import { Ref, ComputedRef, ref, computed, isRef } from '@vue/composition-api'

export interface Dropdown {
  title?: string
  search?: Search
  closeOnClick: boolean
  selected?: ComputedRef<any>
  items: ComputedRef<Item[]>
  callback? (item: Item): void
}

export interface Search {
  placeholder: string
  missing: string
  value: Ref<string>
  onInput (text: string): void
}

export type Item = TextItem | UserItem

export interface ItemBase {
  type: string
  value: any
  callback?: Function
}

export type ItemType = 'text' | 'user'

export interface TextItem extends ItemBase {
  type: 'text'
  text: string
}

export interface UserItem extends ItemBase {
  type: 'user'
  avatar: string
  name: string
}

export interface UseDropdownOptions {
  title?: string
  search?: UseDropdownSearchOptions
  closeOnClick?: boolean
  selected?: ComputedRef<any>
  items: Item[] | ComputedRef<Item[]>
  callback? (item: Item): void
}

export interface UseDropdownSearchOptions {
  placeholder: string
  missing: string
}

export function useDropdown(dropdown: UseDropdownOptions): Dropdown {
  const title = dropdown.title
  const search = dropdown.search && useSearch(dropdown.search)
  const closeOnClick = dropdown.closeOnClick ?? false
  const selected = dropdown.selected
  const items = useItems(dropdown.items, search)
  const callback = dropdown.callback

  return {
    title,
    search,
    closeOnClick,
    selected,
    items,
    callback
  }
}

export function useSearch(search: UseDropdownSearchOptions): Search {
  const placeholder = search.placeholder
  const missing = search.missing
  const value = ref('')

  function onInput(text: string): void {
    value.value = text
  }

  return {
    placeholder,
    missing,
    value,
    onInput
  }
}

function useItems(items: Item[] | ComputedRef<Item[]>, search?: Search): ComputedRef<Item[]> {
  const fuse = computed(() => {
    return createFuse(isRef(items) ? items.value : items, search)
  })

  return computed(() => {
    const value = search?.value.value

    if (!value) {
      return isRef(items) ? items.value : items
    }

    return fuse.value!.search(value).map(result => result.item)
  })
}

function createFuse <T extends Item>(items: T[], search?: Search): Fuse<T> | null {
  return search
    ? new Fuse(items, { keys: ['text', 'name'], threshold: 0.3 })
    : null
}

export function useTextItem(item: Omit<TextItem, 'type'>): TextItem {
  return { type: 'text', ...item }
}

export function useUserItem(item: Omit<UserItem, 'type'>): UserItem {
  return { type: 'user', ...item }
}
