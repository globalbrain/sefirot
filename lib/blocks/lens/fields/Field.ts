import { type ValidationArgs } from '@vuelidate/core'
import { defineComponent, h } from 'vue'
import SDataListItem from '../../../components/SDataListItem.vue'
import { type DropdownSection } from '../../../composables/Dropdown'
import { type TableCell, type TableColumn } from '../../../composables/Table'
import { type FieldContext } from '../FieldContext'
import { type FieldData } from '../FieldData'
import { type FilterOperator } from '../FilterOperator'
import { type LensQuerySort } from '../LensQuery'
import LensFormOverrideBase from '../components/LensFormOverrideBase.vue'
import { type FilterInput } from '../filter-inputs/FilterInput'
import * as RuleMapper from '../validation/RuleMapper'

/**
 * Fallback column width (px) used when a field's definition does not
 * specify one (i.e. `width` is 0). Keeps columns visible by default.
 */
const DEFAULT_COLUMN_WIDTH = 168

export abstract class Field<T extends FieldData> {
  /**
   * The field context, that holds global app context
   * like the current language.
   */
  protected ctx: FieldContext

  /**
   * The field data returned from the backend.
   */
  protected data: T

  /**
   * Creates a new field instance.
   */
  constructor(ctx: FieldContext, fieldData: T) {
    this.ctx = ctx
    this.data = fieldData
  }

  /**
   * Returns the label value for the field depending
   * on the current app language.
   */
  label(): string {
    return this.ctx.lang === 'ja' ? this.data.labelJa : this.data.labelEn
  }

  /**
   * Returns the placeholder value for the field depending
   * on the current app language.
   */
  placeholder(): string | null {
    return this.ctx.lang === 'ja'
      ? (this.data as any).placeholderJa ?? null
      : (this.data as any).placeholderEn ?? null
  }

  /**
   * Returns the help text value for the field depending
   * on the current app language.
   */
  help(): string | null {
    return this.ctx.lang === 'ja'
      ? (this.data as any).helpJa ?? null
      : (this.data as any).helpEn ?? null
  }

  /**
   * Renders the table column configuration for the field.
   */
  tableColumn(): TableColumn<any, any, any, any> {
    return {
      label: this.label(),
      freeze: this.data.freeze,
      // A width of 0 means "unset" — fall back to a sensible default so
      // the column stays visible. Without this, fields whose backend
      // definition omits an explicit width would render as a 0px (hidden)
      // column until the user manually drag-resizes it.
      width: `${this.data.width || DEFAULT_COLUMN_WIDTH}px`,
      cell: (v, r) => this.tableCell(v, r)
    }
  }

  /**
   * The field key sorts are emitted under — the catalog sends it to the backend,
   * which orders by that field's column. Defaults to the field's own key; a
   * subtype whose own value isn't meaningful to sort on can redirect it (e.g. an
   * avatar sorts by its display-name companion). A `null` makes the field
   * unsortable, so no sort menu is shown.
   */
  protected sortKey(): string | null {
    return this.data.key
  }

  /**
   * Renders the table sort menu for the field. The sort maybe null when
   * the field `sortable` option is false (or it has no sortable key).
   */
  tableSortMenu(onSortUpdated: (sort: LensQuerySort) => void): DropdownSection | null {
    const sortKey = this.sortKey()

    if (!this.data.sortable || sortKey === null) {
      return null
    }

    const trans = {
      en: { sort_asc: 'Sort ascending (A...Z)', sort_desc: 'Sort descending (Z...A)' },
      ja: { sort_asc: 'ソート: 昇順 (A...Z)', sort_desc: 'ソート: 降順 (Z...A)' }
    }

    const t = trans[this.ctx.lang]

    return {
      type: 'menu',
      options: [
        { label: t.sort_asc, onClick: () => onSortUpdated?.([sortKey, 'asc']) },
        { label: t.sort_desc, onClick: () => onSortUpdated?.([sortKey, 'desc']) }
      ]
    }
  }

  /**
   * Renders the table filter menu for the field. The filter maybe null when
   * the field has no available filters.
   */
  async tableFilterMenu(
    _filters: any[],
    _onFilterUpdated: (filters: any[]) => void
  ): Promise<DropdownSection | null> {
    return null
  }

  /**
   * Returns the "in" filter values for the given key from the filters array.
   */
  protected inFilterValueFor(key: string, filters: any[]): any[] {
    for (const f of filters) {
      if (f[0] !== key) {
        continue
      }
      if (f[1] !== 'in' || !Array.isArray(f[2])) {
        continue
      }
      return f[2]
    }
    return []
  }

  /**
   * Returns the "=" filter value for the given key from the filters
   * array, or `null` when there is none.
   */
  protected eqFilterValueFor(key: string, filters: any[]): any {
    for (const f of filters) {
      if (f[0] === key && f[1] === '=') {
        return f[2]
      }
    }
    return null
  }

  /**
   * Returns the table cell definition for the field.
   */
  abstract tableCell(v: any, r: any): TableCell

  /**
   * Returns the available filter operators for the field.
   */
  abstract availableFilters(): Partial<Record<FilterOperator, FilterInput>>

  /**
   * Returns the available filter operators as an array of strings.
   */
  availableFilterOperators(): FilterOperator[] {
    return Object.keys(this.availableFilters()) as FilterOperator[]
  }

  /**
   * Returns the filter input by operator.
   */
  filterInputByOperator(operator: FilterOperator): FilterInput {
    const filters = this.availableFilters()
    if (!filters[operator]) {
      throw new Error(`Filter operator "${operator}" is not available for this field.`)
    }
    return filters[operator]
  }

  /**
   * Returns the override inputs for the field.
   */
  overrideForm(): any {
    return defineComponent((props) => {
      return () => h(LensFormOverrideBase, {
        name: props.name,
        field: props.field,
        labelEn: props.override.labelEn,
        labelJa: props.override.labelJa,
        width: props.override.width,
        freeze: props.override.freeze
      })
    }, {
      props: [
        'name',
        'field',
        'override'
      ]
    })
  }

  /**
   * Returns the data list item component for the field.
   */
  abstract dataListItemComponent(): any

  /**
   * Helper function to define the data list item component.
   */
  protected defineDataListItemComponent(fn: (value: any) => any, options: any = null): any {
    return defineComponent((props) => {
      return () => h(SDataListItem, options, {
        label: () => this.label(),
        value: () => fn(props.value)
      })
    }, {
      props: ['value']
    })
  }

  /**
   * Whether this field contributes a value to create / update payloads. Most
   * fields do. Display-only fields (e.g. `content`, which renders static
   * instructions in the form) return false so the sheet renders them but
   * never seeds, validates, submits, or makes them inline-editable.
   */
  isSubmittable(): boolean {
    return true
  }

  /**
   * Whether this field can be edited in place (inline cell / record sheet) with
   * an optimistic display. False for fields whose input value isn't the
   * displayed value and needs a server round-trip first (e.g. a file upload,
   * which holds raw `File` objects before upload) — patching the row with that
   * raw value would render incorrectly or crash. Such fields remain editable in
   * the create form, which is blocking.
   */
  supportsOptimisticUpdate(): boolean {
    return true
  }

  /**
   * Returns the value should be used when the input is empty.
   */
  inputEmptyValue(): any {
    return null
  }

  /**
   * Converts the form input value to the payload value.
   */
  inputToPayload(value: any): any {
    return value
  }

  /**
   * Converts the payload value to the form input value.
   */
  payloadToInput(value: any): any {
    return value
  }

  /**
   * Returns the form input component for the field.
   */
  abstract formInputComponent(): any

  /**
   * Helper function to define the form input component.
   */
  protected defineFormInputComponent(fn: (props: any, emit: any) => any): any {
    return defineComponent(fn, {
      props: ['modelValue', 'validation'],
      emits: ['update:modelValue']
    })
  }

  /**
   * Generate the form input label based on required status.
   */
  protected formInputLabel(): string {
    return this.data.required ? `${this.label()} *` : this.label()
  }

  /**
   * Generates the vuelidate validation rules for the field.
   */
  generateValidationRules(): ValidationArgs {
    return RuleMapper.map([
      ...(this.data.required ? [{ type: 'required' } as const] : []),
      ...this.data.rules
    ])
  }
}
