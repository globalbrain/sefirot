import type { MaybeRef } from '@vueuse/core'
import type { Component } from 'vue'
import { reactive } from 'vue'
import type { Day } from '../support/Day'
import type { DropdownSection } from './Dropdown'

type Optional<T> = {
  [P in keyof T]?: T[P] | null | undefined
}

export interface Table<
  O extends string = any,
  R extends Record<string, any> = any
> {
  orders: O[]
  columns: TableColumns<O, R>
  records?: R[] | null
  header?: boolean
  footer?: boolean
  summary?: Optional<R> | null
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

export type TableColumns<
  O extends string,
  R extends Record<string, any>
> = {
  [K in O]: K extends keyof R
    ? TableColumn<R[K], R>
    : TableColumn<undefined, R>
}

export interface TableColumn<V, R> {
  label?: string
  className?: string
  dropdown?: DropdownSection[]
  resizable?: boolean
  cell?: TableCell | ((value: V, record: R) => TableCell)
}

export type TableCell =
  | TableCellText
  | TableCellDay
  | TableCellPill
  | TableCellPills
  | TableCellAvatar
  | TableCellAvatars
  | TableCellEmpty
  | TableCellComponent

export type TableCellType =
  | 'text'
  | 'day'
  | 'pill'
  | 'pills'
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

export interface UseTableOptions<O extends string, R extends Record<string, any>> {
  orders: MaybeRef<O[]>
  columns: MaybeRef<TableColumns<O, R>>
  records?: MaybeRef<R[] | null | undefined>
  header?: MaybeRef<boolean | undefined>
  footer?: MaybeRef<boolean | undefined>
  summary?: MaybeRef<Optional<R> | null | undefined>
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

export function useTable<O extends string, R extends Record<string, any>>(
  options: UseTableOptions<O, R>
): Table<O, R> {
  return reactive(options) as Table<O, R>
}
