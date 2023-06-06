import { type MaybeRef } from '@vueuse/core'
import { type Component } from 'vue'
import { type Day } from '../support/Day'
import { type DropdownSection } from './Dropdown'

export interface Table<
  O extends string = any,
  R extends Record<string, any> = any,
  SR extends Record<string, any> = any
> {
  orders: MaybeRef<O[]>
  columns: MaybeRef<TableColumns<O, R, SR>>
  menu?: MaybeRef<TableMenu[] | TableMenu[][]>
  records?: MaybeRef<R[] | null | undefined>
  header?: MaybeRef<boolean | undefined>
  footer?: MaybeRef<boolean | undefined>
  summary?: MaybeRef<SR | null | undefined>
  total?: MaybeRef<number | null | undefined>
  page?: MaybeRef<number | null | undefined>
  perPage?: MaybeRef<number | null | undefined>
  reset?: MaybeRef<boolean | undefined>
  borderless?: MaybeRef<boolean>
  loading?: MaybeRef<boolean | undefined>
  virtualScroll?: MaybeRef<boolean | undefined>
  onPrev?(): void
  onNext?(): void
  onReset?(): void
}

export type TableColumns<
  O extends string,
  R extends Record<string, any>,
  SR extends Record<string, any>
> = {
  [K in O]: TableColumn<R[K], R, SR[K], SR>
}

export interface TableColumn<V, R, SV, SR> {
  label?: string
  className?: string
  dropdown?: DropdownSection[]
  grow?: boolean
  resizable?: boolean
  cell?: TableCell | TableColumnCellFn<V, R>
  summaryCell?: TableCell | TableColumnCellFn<SV, SR>
}

export type TableColumnCellFn<V, R> = (value: V, record: R) => TableCell

export type TableCell =
  | TableCellText
  | TableCellDay
  | TableCellPill
  | TableCellPills
  | TableCellState
  | TableCellAvatar
  | TableCellAvatars
  | TableCellEmpty
  | TableCellComponent

export type TableCellType =
  | 'text'
  | 'day'
  | 'pill'
  | 'pills'
  | 'state'
  | 'avatar'
  | 'avatars'
  | 'empty'
  | 'component'

export interface TableCellBase {
  type: TableCellType
}

export interface TableCellText extends TableCellBase {
  type: 'text'
  icon?: any
  value?: string | null | ((value: any, record: any) => string | null)
  link?(value: any, record: any): string
  color?: TableCellTextColor | ((value: any, record: any) => TableCellTextColor)
  iconColor?: TableCellTextColor | ((value: any, record: any) => TableCellTextColor)
  onClick?(value: any, record: any): void
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
  value?: Day | null
  format?: string
  color?: 'neutral' | 'soft' | 'mute'
}

export interface TableCellPill extends TableCellBase {
  type: 'pill'
  value?: string | ((value: any, record: any) => string)
  color?: TableCellPillColor | ((value: any, record: any) => TableCellPillColor)
}

export type TableCellPillColor = 'neutral' | 'mute' | 'info' | 'success' | 'warning' | 'danger'

export interface TableCellPills extends TableCellBase {
  type: 'pills'
  pills(value: any, record: any): TableCellPillItem[]
}

export interface TableCellPillItem {
  label: string
  color: TableCellPillColor
}

export interface TableCellAvatar extends TableCellBase {
  type: 'avatar'
  image?: string | null | ((value: any, record: any) => string | null | undefined)
  name?: string | null | ((value: any, record: any) => string | null | undefined)
  link?: string | null | ((value: any, record: any) => string | null | undefined)
  color?: 'neutral' | 'soft' | 'mute'
  onClick?(value: any, record: any): void
}

export interface TableCellAvatars extends TableCellBase {
  type: 'avatars'
  avatars: TableCellAvatarsOption[] | ((value: any, record: any) => TableCellAvatarsOption[])
  color?: 'neutral' | 'soft' | 'mute'
}

export interface TableCellAvatarsOption {
  image?: string | null
  name?: string | null
}

export interface TableCellEmpty extends TableCellBase {
  type: 'empty'
}

export interface TableCellComponent extends TableCellBase {
  type: 'component'
  component: Component
  props?: Record<string, any>
}

export interface TableCellState extends TableCellBase {
  type: 'state'
  label: string
  mode?: 'neutral' | 'mute' | 'info' | 'success' | 'warning' | 'danger'
}

export interface TableMenu {
  label: string
  state?: 'inactive' | 'active' | 'indicate'
  dropdown: DropdownSection[]
}

export function useTable<
  O extends string,
  R extends Record<string, any>,
  SR extends Record<string, any>
>(options: Table<O, R, SR>): Table<O, R, SR> {
  return options
}
