import { MaybeRef } from '@vueuse/core'
import { reactive } from 'vue'

export interface Table {
  orders: string[]
  columns: TableColumns
  records?: Record<string, any>[]
  total?: number
  page?: number
  perPage?: number
  reset?: boolean
  borderless?: boolean
  loading?: boolean
  onPrev?(): void
  onNext?(): void
  onReset?(): void
}

export interface TableColumns {
  [name: string]: TableColumn
}

export interface TableColumn {
  label: string
  className?: string
  dropdown?: TableDropdownSection[]
  cell?: TableCell
}

export type TableDropdownSection =
  | TableDropdownSectionMenu
  | TableDropdownSectionFilter

export type TableDropdownSectionType = 'menu' | 'filter'

export interface TableDropdownSectionBase {
  type: TableDropdownSectionType
}

export interface TableDropdownSectionMenu extends TableDropdownSectionBase {
  type: 'menu'
  options: TableDropdownSectionMenuOption[]
}

export interface TableDropdownSectionMenuOption {
  label: string
  onClick(): void
}

export interface TableDropdownSectionFilter extends TableDropdownSectionBase {
  type: 'filter'
  search?: boolean
  selected: MaybeRef<string[]>
  options: TableDropdownSectionFilterOption[]
  onClick?(value: string): void
}

export interface TableDropdownSectionFilterOption {
  label: string
  value: string
  onClick?(value: string): void
}

export type TableCell =
  | TableCellText
  | TableCellDay
  | TableCellPill
  | TableCellAvatar
  | TableCellAvatars

export type TableCellType = 'text' | 'day' | 'pill' | 'avatar' | 'avatars'

export interface TableCellBase {
  type: TableCellType
}

export interface TableCellText extends TableCellBase {
  type: 'text'
  icon?: any
  value?: string | ((value: any) => string)
  link?(value: any, record: any): string
  callback?(value: any, record: any): void
  color?: 'neutral' | 'soft' | 'mute'
  iconColor?: 'neutral' | 'soft' | 'mute'
}

export interface TableCellDay extends TableCellBase {
  type: 'day'
  format?: string
  color?: 'neutral' | 'soft' | 'mute'
}

export interface TableCellPill extends TableCellBase {
  type: 'pill'
  value?: string | ((value: any) => string)
  color?: TableCellPillColor | ((value: any) => TableCellPillColor)
}

export type TableCellPillColor = 'info' | 'success' | 'warning' | 'danger' | 'mute'

export interface TableCellAvatar extends TableCellBase {
  type: 'avatar'
  image?(value: any, record: any): string | undefined
  name?(value: any, record: any): string
  link?(value: any, record: any): string
  color?: 'neutral' | 'soft' | 'mute'
}

export interface TableCellAvatars extends TableCellBase {
  type: 'avatars'
  avatars(value: any, record: any): TableCellAvatarsOption[]
  color?: 'neutral' | 'soft' | 'mute'
}

export interface TableCellAvatarsOption {
  image?: string
  name?: string
}

export interface UseTableOptions {
  orders: string[]
  columns: TableColumns
  records?: MaybeRef<Record<string, any>[] | undefined>
  total?: MaybeRef<number | undefined>
  page?: MaybeRef<number | undefined>
  perPage?: MaybeRef<number | undefined>
  reset?: MaybeRef<boolean | undefined>
  borderless?: boolean
  loading?: MaybeRef<boolean | undefined>
  onPrev?(): void
  onNext?(): void
  onReset?(): void
}

export function useTable(options: UseTableOptions): Table {
  return reactive(options)
}

export function createTableDropdown(options: TableDropdownSection[]): TableDropdownSection[] {
  return options
}
