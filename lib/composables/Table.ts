import { type Component, type MaybeRef, type MaybeRefOrGetter } from 'vue'
import { type Mode } from '../components/SButton.vue'
import { type Day } from '../support/Day'
import { type DropdownSection } from './Dropdown'

export interface Table<
  O extends string = string,
  R extends Record<string, any> = any,
  SR extends Record<string, any> = any
> {
  records?: MaybeRef<R[] | null | undefined>
  orders: MaybeRef<O[]>
  columns: MaybeRef<TableColumns<O, R, SR>>
  summary?: MaybeRef<SR | null | undefined>
  indexField?: keyof R
  loading?: MaybeRef<boolean | undefined>
  rowSize?: MaybeRef<number | undefined>
  borderless?: MaybeRef<boolean>

  /**
   * @deprecated Use `<SControl>` to add equivalent features.
  */
  actions?: MaybeRef<TableHeaderAction[]>
  menu?: MaybeRef<TableMenu[] | TableMenu[][]>
  header?: MaybeRef<boolean | undefined>
  footer?: MaybeRef<boolean | undefined>
  total?: MaybeRef<number | null | undefined>
  page?: MaybeRef<number | null | undefined>
  perPage?: MaybeRef<number | null | undefined>
  reset?: MaybeRef<boolean | undefined>
  borderSize?: MaybeRef<number | undefined>
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
  cell?: TableCell<V, R> | TableColumnCellFn<V, R>
  summaryCell?: TableCell<SV, SR> | TableColumnCellFn<SV, SR>
  show?: MaybeRefOrGetter<boolean>
}

export type TableColumnCellFn<V, R> = (value: V, record: R) => TableCell<V, R>

export type TableCell<V = any, R = any> =
  | TableCellText<V, R>
  | TableCellNumber<V, R>
  | TableCellDay
  | TableCellPill<V, R>
  | TableCellPills<V, R>
  | TableCellState
  | TableCellAvatar<V, R>
  | TableCellAvatars<V, R>
  | TableCellCustom
  | TableCellEmpty
  | TableCellComponent
  | TableCellActions<R>

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

export type ColorModes =
  | 'default'
  | 'mute'
  | 'neutral'
  | 'info'
  | 'success'
  | 'warning'
  | 'danger'

export interface TableCellBase {
  type: TableCellType
}

export interface TableCellText<V = any, R = any> extends TableCellBase {
  type: 'text'
  align?: 'left' | 'center' | 'right'
  icon?: any
  value?: string | null | ((value: V, record: R) => string | null)
  link?: string | null | ((value: V, record: R) => string)
  color?: TableCellValueColor | ((value: V, record: R) => TableCellValueColor)
  iconColor?: TableCellValueColor | ((value: V, record: R) => TableCellValueColor)
  onClick?(value: V, record: R): void
}

export interface TableCellNumber<V = any, R = any> extends TableCellBase {
  type: 'number'
  align?: 'left' | 'center' | 'right'
  icon?: any
  value?: number | null
  separator?: boolean
  link?: string | null
  color?: TableCellValueColor
  iconColor?: TableCellValueColor
  onClick?(value: V, record: R): void
}

export type TableCellValueColor = ColorModes | 'soft'

export interface TableCellDay extends TableCellBase {
  type: 'day'
  align?: 'left' | 'center' | 'right'
  value?: Day | null
  format?: string
  color?: 'neutral' | 'soft' | 'mute'
}

export interface TableCellPill<V = any, R = any> extends TableCellBase {
  type: 'pill'
  value?: string | ((value: V, record: R) => string)
  color?: TableCellPillColor | ((value: V, record: R) => TableCellPillColor)
}

export type TableCellPillColor = ColorModes

export interface TableCellPills<V = any, R = any> extends TableCellBase {
  type: 'pills'
  pills(value: V, record: R): TableCellPillItem[]
}

export interface TableCellPillItem {
  label: string
  color?: TableCellPillColor
}

export interface TableCellAvatar<V = any, R = any> extends TableCellBase {
  type: 'avatar'
  image?: string | null | ((value: V, record: R) => string | null | undefined)
  name?: string | null | ((value: V, record: R) => string | null | undefined)
  link?: string | null | ((value: V, record: R) => string | null | undefined)
  color?: 'neutral' | 'soft' | 'mute'
  onClick?(value: V, record: R): void
}

export interface TableCellAvatars<V = any, R = any> extends TableCellBase {
  type: 'avatars'
  avatars: TableCellAvatarsOption[] | ((value: V, record: R) => TableCellAvatarsOption[])
  color?: 'neutral' | 'soft' | 'mute'
  avatarCount?: number
  nameCount?: number
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

export interface TableCellActions<R = any> extends TableCellBase {
  type: 'actions'
  actions: TableCellAction<R>[]
}

export interface TableCellAction<R = any> {
  mode?: Mode
  icon?: any
  iconMode?: Mode
  label?: string
  labelMode?: Mode
  onClick(record: R): void
  show?(record: R): boolean
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
