import { reactive } from 'vue'

export interface Table {
  orders: string[]
  columns: TableColumns
  records: Record<string, any>[]
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

export type TableCell = TableCellText

export type TableCellType = 'text'

export interface TableCellBase {
  type: TableCellType
}

export interface TableCellText extends TableCellBase {
  type: 'text'
  color?: 'neutral' | 'soft' | 'mute'
  link?(value: any, record: any): string
}

export function useTable(options: Table): Table {
  return reactive(options)
}
