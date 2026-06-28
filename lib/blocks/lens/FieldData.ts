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
  avatar: AvatarFieldData
  boolean: BooleanFieldData
  content: ContentFieldData
  date: DateFieldData
  datetime: DatetimeFieldData
  decimal: DecimalFieldData
  file_upload: FileUploadFieldData
  id: IdFieldData
  link: LinkFieldData
  number: NumberFieldData
  related_many: RelatedManyFieldData
  related_one: RelatedOneFieldData
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
  /**
   * Per-context visibility, mirroring the backend field definition. The
   * catalog renders `showOnIndex` columns; the record sheet shows
   * `showOnDetail` rows; the create form shows `showOnCreate` fields; and
   * `showOnUpdate` marks a field editable (inline in the table and in the
   * sheet) for an existing record. Optional so read-only catalogs whose
   * backend predates these flags keep working (treated as index+detail only).
   */
  showOnIndex?: boolean
  showOnDetail?: boolean
  showOnCreate?: boolean
  showOnUpdate?: boolean
}

export interface AvatarFieldData extends FieldDataBase {
  type: 'avatar'
  /**
   * Optional keys on the record that hold the display name, per language. The
   * avatar uses the name (resolved against the active language) for the
   * initials fallback / tooltip when the image is unavailable. The field
   * value itself is the image URL.
   *
   * When the field is editable, these companion keys also become editable from
   * the inline cell (the pencil affordance beside the avatar edits both names),
   * so the avatar and its names can be updated together.
   */
  nameEn?: string | null
  nameJa?: string | null
  /**
   * The `accept` attribute for the file picker (e.g. `image/jpeg,image/png`).
   * Defaults to `image/*`.
   */
  accept?: string | null
  /** Help text shown beneath the picker, per language. */
  helpEn?: string | null
  helpJa?: string | null
  /** Picker preview shape. Defaults to `circle` (avatars are round). */
  imageType?: 'circle' | 'rectangle' | null
}

export interface BooleanFieldData extends FieldDataBase {
  type: 'boolean'
  labelTrueEn: string | null
  labelTrueJa: string | null
  labelFalseEn: string | null
  labelFalseJa: string | null
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
  align: 'left' | 'center' | 'right' | null
  separator: boolean | null
  abbr: 'en' | 'ja' | null
  fractionDigits: number | null
}

/**
 * A `decimal` field is rendered identically to a `number` field on the
 * client. The distinction exists so backends can preserve arbitrary
 * precision (e.g. sending the value as a string instead of a JS number)
 * without losing the type-level signal at the spec layer.
 */
export interface DecimalFieldData extends FieldDataBase {
  type: 'decimal'
  align: 'left' | 'center' | 'right' | null
  separator: boolean | null
  abbr: 'en' | 'ja' | null
  fractionDigits: number | null
}

export interface SelectFieldData extends FieldDataBase {
  type: 'select'
  displayAs: 'text' | 'state' | 'pills'
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
  image?: string | null
  resourceEndpointMethod: 'get' | 'post'
  resourceEndpointPath: string
  resourceEndpointBody?: Record<string, any> | null
  resourceEndpointDataKey: string | null
  resourceTitle: string
  resourceImage?: string | null
  displayAs?: 'pills' | 'avatars' | null
}

export interface RelatedOneFieldData extends FieldDataBase {
  type: 'related_one'
  title: string
  image?: string | null
  resourceEndpointMethod: 'get' | 'post'
  resourceEndpointPath: string
  resourceEndpointBody?: Record<string, any> | null
  resourceEndpointDataKey: string | null
  resourceTitle: string
  resourceImage?: string | null
  displayAs?: 'text' | 'avatar' | null
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
  unitBefore: string | null
  unitAfter: string | null
}

export interface TextareaFieldData extends FieldDataBase {
  type: 'textarea'
  placeholderEn: string | null
  placeholderJa: string | null
  helpEn: string | null
  helpJa: string | null
  rows: number
}
