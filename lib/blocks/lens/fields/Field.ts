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
      width: `${this.data.width}px`,
      cell: (v, r) => this.tableCell(v, r)
    }
  }

  /**
   * Renders the table sort menu for the field. The sort maybe null when
   * the field `sortable` option is false.
   */
  tableSortMenu(onSortUpdated: (sort: LensQuerySort) => void): DropdownSection | null {
    if (!this.data.sortable) {
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
        { label: t.sort_asc, onClick: () => onSortUpdated?.([this.data.key, 'asc']) },
        { label: t.sort_desc, onClick: () => onSortUpdated?.([this.data.key, 'desc']) }
      ]
    }
  }

  /**
   * Renders the table filter menu for the field. The filter maybe null when
   * the field has no available filters.
   */
  async tableFilterMenu(_filters: any[], _onFilterUpdated: (filters: any[]) => void): Promise<DropdownSection | null> {
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
