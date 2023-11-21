import { type Component, type MaybeRef } from 'vue'
import { type Mode } from '../components/SButton.vue'
import { type Day } from '../support/Day'
import { type DropdownSection } from './Dropdown'

export interface Table<
  O extends string = string,
  R extends Record<string, any> = any,
  SR extends Record<string, any> = any
> {
  orders: MaybeRef<O[]>
  columns: MaybeRef<TableColumns<O, R, SR>>
  menu?: MaybeRef<TableMenu[] | TableMenu[][]>
  actions?: MaybeRef<TableHeaderAction[]>
  records?: MaybeRef<R[] | null | undefined>
  header?: MaybeRef<boolean | undefined>
  footer?: MaybeRef<boolean | undefined>
  summary?: MaybeRef<SR | null | undefined>
  total?: MaybeRef<number | null | undefined>
  page?: MaybeRef<number | null | undefined>
  perPage?: MaybeRef<number | null | undefined>
  /** @deprecated use `actions` instead */
  reset?: MaybeRef<boolean | undefined>
  borderless?: MaybeRef<boolean>
  loading?: MaybeRef<boolean | undefined>
  rowSize?: MaybeRef<number | undefined>
  borderSize?: MaybeRef<number | undefined>
  indexField?: keyof R
  onPrev?(): void
  onNext?(): void
  /** @deprecated use `actions` instead */
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
  show?: boolean
}

export type TableColumnCellFn<V, R> = (value: V, record: R) => TableCell

export type TableCell =
  | TableCellText
  | TableCellNumber
  | TableCellDay
  | TableCellPill
  | TableCellPills
  | TableCellState
  | TableCellAvatar
  | TableCellAvatars
  | TableCellCustom
  | TableCellEmpty
  | TableCellComponent
  | TableCellActions

export type TableCellType =
  | 'text'
  | 'number'
  | 'day'
  | 'pill'
  | 'pills'
  | 'state'
  | 'avatar'
  | 'avatars'
  | 'custom'
  | 'empty'
  | 'component'
  | 'actions'

export type ColorModes = 'default' | 'mute' | 'neutral' | 'info' | 'success' | 'warning' | 'danger'

export interface TableCellBase {
  type: TableCellType
}

export interface TableCellText extends TableCellBase {
  type: 'text'
  align?: 'left' | 'center' | 'right'
  icon?: any
  value?: string | null | ((value: any, record: any) => string | null)
  link?: string | null | ((value: any, record: any) => string)
  color?: TableCellValueColor | ((value: any, record: any) => TableCellValueColor)
  iconColor?: TableCellValueColor | ((value: any, record: any) => TableCellValueColor)
  onClick?(value: any, record: any): void
}

export interface TableCellNumber extends TableCellBase {
  type: 'number'
  align?: 'left' | 'center' | 'right'
  icon?: any
  value?: number | null
  separator?: boolean
  link?: string | null
  color?: TableCellValueColor
  iconColor?: TableCellValueColor
  onClick?(value: any, record: any): void
}

export type TableCellValueColor = ColorModes | 'soft'

export interface TableCellDay extends TableCellBase {
  type: 'day'
  align?: 'left' | 'center' | 'right'
  value?: Day | null
  format?: string
  color?: 'neutral' | 'soft' | 'mute'
}

export interface TableCellPill extends TableCellBase {
  type: 'pill'
  value?: string | ((value: any, record: any) => string)
  color?: TableCellPillColor | ((value: any, record: any) => TableCellPillColor)
}

export type TableCellPillColor = ColorModes

export interface TableCellPills extends TableCellBase {
  type: 'pills'
  pills(value: any, record: any): TableCellPillItem[]
}

export interface TableCellPillItem {
  label: string
  color?: TableCellPillColor
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

export interface TableCellCustom extends TableCellBase {
  type: 'custom'
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
  mode?: ColorModes
}

export interface TableCellActions extends TableCellBase {
  type: 'actions'
  actions: TableCellAction[]
}

export interface TableCellAction {
  mode?: Mode
  icon?: any
  iconMode?: Mode
  label?: string
  labelMode?: Mode
  onClick(record: any): void
  show?(record: any): boolean
}

export interface TableMenu {
  label: string
  state?: 'inactive' | 'active' | 'indicate'
  dropdown: DropdownSection[]
}

export interface TableHeaderAction {
  show?: boolean
  mode?: Mode
  label: string
  labelMode?: Mode
  onClick(): void
}

export function useTable<
  O extends string,
  R extends Record<string, any>,
  SR extends Record<string, any>
>(options: Table<O, R, SR>): Table<O, R, SR> {
  return options
}
