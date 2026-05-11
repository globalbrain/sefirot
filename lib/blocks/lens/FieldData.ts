import { type Rule } from './Rule'

/**
 * Registry of all available field data types. This interface can be
 * extended via declaration merging to add custom field types.
 *
 * @example
 * declare module 'sefirot/pkg/lens/FieldData' {
 *   interface FieldDataRegistry {
 *     my_custom: MyCustomFieldData
 *   }
 * }
 *
 * interface MyCustomFieldData extends FieldDataBase {
 *   type: 'my_custom'
 *   customProp: string
 * }
 */
export interface FieldDataRegistry {
  content: ContentFieldData
  date: DateFieldData
  datetime: DatetimeFieldData
  decimal: DecimalFieldData
  file_upload: FileUploadFieldData
  id: IdFieldData
  link: LinkFieldData
  number: NumberFieldData
  related_many: RelatedManyFieldData
  select: SelectFieldData
  slack_message: SlackMessageFieldData
  text: TextFieldData
  textarea: TextareaFieldData
}

export type FieldData = FieldDataRegistry[keyof FieldDataRegistry]

export type FieldDataType = keyof FieldDataRegistry

export interface FieldDataBase {
  key: string
  labelEn: string
  labelJa: string
  filterKey: string
  sortable: boolean
  freeze: boolean
  width: number
  required: boolean
  rules: Rule[]
}

export interface ContentFieldData extends FieldDataBase {
  type: 'content'
  bodyEn: string
  bodyJa: string
}

export interface DateFieldData extends FieldDataBase {
  type: 'date'
  placeholderEn: string | null
  placeholderJa: string | null
  helpEn: string | null
  helpJa: string | null
}

export interface DatetimeFieldData extends FieldDataBase {
  type: 'datetime'
}

export interface FileUploadFieldData extends FieldDataBase {
  type: 'file_upload'
  placeholderEn: string | null
  placeholderJa: string | null
  helpEn: string | null
  helpJa: string | null
}

export interface IdFieldData extends FieldDataBase {
  type: 'id'
  prefix: string
}

export interface LinkFieldData extends FieldDataBase {
  type: 'link'
  placeholderEn: string | null
  placeholderJa: string | null
  helpEn: string | null
  helpJa: string | null
}

/**
 * Common formatting options shared by `number` and `decimal` field types.
 * All four are `null` by default — set them on the server side to opt in
 * to specific rendering behavior:
 *
 * - `align`: cell text alignment. `null` falls back to the table default
 *   (left). Numbers are often right-aligned, but the spec does not assume
 *   that — callers/servers decide per field.
 * - `separator`: when `true`, the integer portion is rendered with
 *   thousand separators (e.g. `1,000,000`). Only applies when `abbr` is
 *   `null` (abbreviation already produces compact output).
 * - `abbr`: switches the cell to abbreviated rendering using the given
 *   locale's compact notation — `en` → `1K`, `1M`, `1B`; `ja` → `1万`,
 *   `1億`, `1兆`. `null` renders the raw number.
 * - `fractionDigits`: max number of fractional digits to show. Applies
 *   to both plain and abbreviated rendering. `null` means "show as-is"
 *   for plain rendering and "default to 1 digit" for abbreviation.
 */
export interface NumberFieldFormatting {
  align: 'left' | 'center' | 'right' | null
  separator: boolean
  abbr: 'en' | 'ja' | null
  fractionDigits: number | null
}

export interface NumberFieldData extends FieldDataBase, NumberFieldFormatting {
  type: 'number'
}

/**
 * A `decimal` field is rendered identically to a `number` field on the
 * client. The distinction exists so backends can preserve arbitrary
 * precision (e.g. sending the value as a string instead of a JS number)
 * without losing the type-level signal at the spec layer.
 */
export interface DecimalFieldData extends FieldDataBase, NumberFieldFormatting {
  type: 'decimal'
}

export interface SelectFieldData extends FieldDataBase {
  type: 'select'
  displayAs: 'text' | 'state'
  inputAs: 'dropdown' | 'radio'
  placeholderEn: string | null
  placeholderJa: string | null
  helpEn: string | null
  helpJa: string | null
  options: SelectFieldDataOption[]
  multiple: boolean
}

export interface SelectFieldDataOption {
  mode: 'default' | 'mute' | 'info' | 'success' | 'warning' | 'danger'
  value: string
  labelEn: string
  labelJa: string
}

export interface RelatedManyFieldData extends FieldDataBase {
  type: 'related_many'
  title: string
  resourceEndpointMethod: 'get' | 'post'
  resourceEndpointPath: string
  resourceEndpointDataKey: string | null
  resourceTitle: string
}

export interface SlackMessageFieldData extends FieldDataBase {
  type: 'slack_message'
}

export interface TextFieldData extends FieldDataBase {
  type: 'text'
  placeholderEn: string | null
  placeholderJa: string | null
  helpEn: string | null
  helpJa: string | null
}

export interface TextareaFieldData extends FieldDataBase {
  type: 'textarea'
  placeholderEn: string | null
  placeholderJa: string | null
  helpEn: string | null
  helpJa: string | null
  rows: number
}
