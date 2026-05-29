import { xor } from 'lodash-es'
import { type DropdownSection } from '../../../composables/Dropdown'
import { type TableCell } from '../../../composables/Table'
import { type BooleanFieldData } from '../FieldData'
import { type FilterOperator } from '../FilterOperator'
import { type FilterInput } from '../filter-inputs/FilterInput'
import { SelectFilterInput } from '../filter-inputs/SelectFilterInput'
import { Field } from './Field'

const DEFAULTS = {
  en: { true: 'Yes', false: 'No' },
  ja: { true: 'はい', false: 'いいえ' }
} as const

export class BooleanField extends Field<BooleanFieldData> {
  override tableCell(v: any, _r: any): TableCell {
    return {
      type: 'text',
      value: this.formatValue(v)
    }
  }

  override async tableFilterMenu(filters: any[], onFilterUpdated: (filters: any[]) => void): Promise<DropdownSection | null> {
    const selected = this.inFilterValueFor(this.data.key, filters)

    return {
      type: 'filter',
      search: false,
      selected,
      options: this.filterOptions(),
      onClick: (v) => { onFilterUpdated?.([this.data.key, 'in', xor(selected, [v])]) }
    }
  }

  override availableFilters(): Partial<Record<FilterOperator, FilterInput>> {
    // Use `in` to match the operator the inline column menu emits, and
    // `.multiple()` so the value stays a boolean array — the single-value
    // cast would stringify `true` to `'true'`, breaking option matching
    // and the backend boolean comparison.
    const selectMany = new SelectFilterInput().options(() => Promise.resolve(this.filterOptions())).multiple()
    return {
      in: selectMany
    }
  }

  override dataListItemComponent(): any {
    return this.defineDataListItemComponent((value) => this.formatValue(value))
  }

  override formInputComponent(): any {
    throw new Error('Not implemented.')
  }

  protected filterOptions(): Array<{ value: boolean; label: string }> {
    return [
      { value: true, label: this.formatValue(true)! },
      { value: false, label: this.formatValue(false)! }
    ]
  }

  protected formatValue(v: any): string | null {
    if (v === null || v === undefined) {
      return null
    }
    if (v) {
      return this.ctx.lang === 'ja'
        ? (this.data.labelTrueJa ?? DEFAULTS.ja.true)
        : (this.data.labelTrueEn ?? DEFAULTS.en.true)
    }
    return this.ctx.lang === 'ja'
      ? (this.data.labelFalseJa ?? DEFAULTS.ja.false)
      : (this.data.labelFalseEn ?? DEFAULTS.en.false)
  }
}
