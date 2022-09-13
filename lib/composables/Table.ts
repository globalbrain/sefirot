import { MaybeRef } from '@vueuse/core'
import { reactive } from 'vue'

export interface Table {
  orders: string[]
  columns: TableColumns
  records?: Record<string, any>[]
  total?: number
  page?: number
  reset?: boolean
  borderless?: boolean
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
  selected: string[]
  options: TableDropdownSectionFilterOption[]
}

export interface TableDropdownSectionFilterOption {
  label: string
  value: string
  onClick(value: string): void
}

export type TableCell =
  | TableCellText
  | TableCellDay
  | TableCellAvatar

export type TableCellType = 'text' | 'day' | 'avatar'

export interface TableCellBase {
  type: TableCellType
}

export interface TableCellText extends TableCellBase {
  type: 'text'
  value?: string | ((value: any) => string)
  link?(value: any, record: any): string
  color?: 'neutral' | 'soft' | 'mute'
}

export interface TableCellDay extends TableCellBase {
  type: 'day'
  format?: string
  color?: 'neutral' | 'soft' | 'mute'
}

export interface TableCellAvatar extends TableCellBase {
  type: 'avatar'
  image?(value: any, record: any): string
  name?(value: any, record: any): string
  link?(value: any, record: any): string
  color?: 'neutral' | 'soft' | 'mute'
}

export interface UseTableOptions {
  orders: string[]
  columns: TableColumns
  records?: MaybeRef<Record<string, any>[] | undefined>
  total?: MaybeRef<number | undefined>
  page?: MaybeRef<number | undefined>
  reset?: boolean
  borderless?: boolean
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
