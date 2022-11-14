import { MaybeRef } from '@vueuse/core'
import { Component, reactive } from 'vue'
import { DropdownSection } from './Dropdown'

export interface Table {
  orders: string[]
  columns: TableColumns
  records?: Record<string, any>[] | null
  total?: number | null
  page?: number | null
  perPage?: number | null
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
  dropdown?: DropdownSection[]
  cell?: TableCell
}

export type TableCell =
  | TableCellText
  | TableCellDay
  | TableCellPill
  | TableCellAvatar
  | TableCellAvatars
  | TableCellComponent

export type TableCellType = 'text' | 'day' | 'pill' | 'avatar' | 'avatars' | 'component'

export interface TableCellBase {
  type: TableCellType
}

export interface TableCellText extends TableCellBase {
  type: 'text'
  icon?: any
  value?: string | ((value: any) => string)
  link?(value: any, record: any): string
  color?: TableCellTextColor | ((value: any, record: any) => TableCellTextColor)
  iconColor?: TableCellTextColor | ((value: any, record: any) => TableCellTextColor)
}

export type TableCellTextColor =
  | 'neutral'
  | 'soft'
  | 'mute'
  | 'info'
  | 'success'
  | 'warning'
  | 'danger'

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

export interface TableCellComponent extends TableCellBase {
  type: 'component'
  component: Component
  props?: Record<string, any>
}

export interface TableCellAvatarsOption {
  image?: string
  name?: string
}

export interface UseTableOptions {
  orders: string[]
  columns: TableColumns
  records?: MaybeRef<Record<string, any>[] | null | undefined>
  total?: MaybeRef<number | null | undefined>
  page?: MaybeRef<number | null | undefined>
  perPage?: MaybeRef<number | null | undefined>
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
