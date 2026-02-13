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

export interface NumberFieldData extends FieldDataBase {
  type: 'number'
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
