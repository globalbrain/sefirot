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
    // A boolean has exactly two states, so the inline menu is a single
    // select on `=`. Re-clicking the active value clears the filter.
    const selected = this.eqFilterValueFor(this.data.key, filters)

    return {
      type: 'filter',
      search: false,
      selected,
      options: this.filterOptions(),
      onClick: (v) => { onFilterUpdated?.([this.data.key, '=', selected === v ? null : v]) }
    }
  }

  override availableFilters(): Partial<Record<FilterOperator, FilterInput>> {
    // A boolean is a two-state value, so `=` / `!=` express the filter
    // more naturally than set membership. The single-value cast preserves
    // the boolean (it no longer stringifies), so option matching and the
    // backend comparison stay correct.
    const selectOne = new SelectFilterInput().options(() => Promise.resolve(this.filterOptions()))
    return {
      '=': selectOne,
      '!=': selectOne
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
