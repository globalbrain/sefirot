import { type Component, type MaybeRef, type MaybeRefOrGetter } from 'vue'
import { type Mode as ButtonMode } from '../components/SButton.vue'
import { type State as IndicatorState } from '../components/SIndicator.vue'
import { type Day } from '../support/Day'
import { type DropdownSection } from './Dropdown'
import { type Position } from './Tooltip'

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
  disableSelection?: (record: R) => boolean
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
  freeze?: boolean
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
  | TableCellPath
  | TableCellDay
  | TableCellPill
  | TableCellPills
  | TableCellState
  | TableCellIndicator
  | TableCellAvatar<V, R>
  | TableCellAvatars
  | TableCellCustom
  | TableCellEmpty
  | TableCellComponent
  | TableCellActions<R>

export type TableCellType =
  | 'text'
  | 'number'
  | 'path'
  | 'day'
  | 'pill'
  | 'pills'
  | 'state'
  | 'indicator'
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
  icon?: Component
  value?: string | null
  link?: string | null
  color?: TableCellValueColor
  iconColor?: TableCellValueColor
  onClick?(value: V, record: R): void
}

export interface TableCellNumber<V = any, R = any> extends TableCellBase {
  type: 'number'
  align?: 'left' | 'center' | 'right'
  icon?: Component
  value?: number | null
  separator?: boolean
  link?: string | null
  color?: TableCellValueColor
  iconColor?: TableCellValueColor
  onClick?(value: V, record: R): void
}

export interface TableCellPath extends TableCellBase {
  type: 'path'
  segments: TableCellPathSegment[]
}

export interface TableCellPathSegment {
  text: string
  link?: string | null
  color?: TableCellValueColor
  onClick?(): void
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
  value?: string
  color?: TableCellPillColor
}

export type TableCellPillColor = ColorModes

export interface TableCellPills extends TableCellBase {
  type: 'pills'
  pills: TableCellPillItem[]
}

export interface TableCellPillItem {
  label: string
  color?: TableCellPillColor
}

export interface TableCellAvatar<V = any, R = any> extends TableCellBase {
  type: 'avatar'
  image?: string | null
  name?: string | null
  link?: string | null
  color?: 'neutral' | 'soft' | 'mute'
  onClick?(value: V, record: R): void
}

export interface TableCellAvatars extends TableCellBase {
  type: 'avatars'
  avatars: TableCellAvatarsOption[]
  color?: 'neutral' | 'soft' | 'mute'
  avatarCount?: number
  nameCount?: number
  tooltip?: boolean | { position?: Position }
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

export interface TableCellIndicator extends TableCellBase {
  type: 'indicator'
  state: IndicatorState
  label?: string | null
}

export interface TableCellActions<R = any> extends TableCellBase {
  type: 'actions'
  actions: TableCellAction<R>[]
}

export interface TableCellAction<R = any> {
  mode?: ButtonMode
  icon?: Component
  iconMode?: ButtonMode
  label?: string
  labelMode?: ButtonMode
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
  mode?: ButtonMode
  label: string
  labelMode?: ButtonMode
  onClick(): void
}

export function useTable<
  O extends string,
  R extends Record<string, any>,
  SR extends Record<string, any>
>(options: Table<O, R, SR>): Table<O, R, SR> {
  return options
}
