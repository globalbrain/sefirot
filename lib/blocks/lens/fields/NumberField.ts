import { type TableCell } from '../../../composables/Table'
import { abbreviate } from '../../../support/Num'
import { type DecimalFieldData, type NumberFieldData } from '../FieldData'
import { type FilterOperator } from '../FilterOperator'
import { type FilterInput } from '../filter-inputs/FilterInput'
import { NumberFilterInput } from '../filter-inputs/NumberFilterInput'
import { Field } from './Field'

/**
 * Renders a `number` or `decimal` field as a table cell. The two share
 * the same formatting contract (see `NumberFieldFormatting`) and the
 * same rendering rules, so this helper covers both.
 *
 * - When `abbr` is `null`, we emit a `number` cell. The cell component
 *   applies `separator` and `maximumFractionDigits` via
 *   `toLocaleString`. The raw incoming value is coerced with `Number()`
 *   so decimal fields delivered as strings still render.
 * - When `abbr` is `'en'` or `'ja'`, we emit a `text` cell with the
 *   compact-notation string baked in. We fall back to a 1-digit
 *   precision when `fractionDigits` is `null` — matches what the
 *   default user-facing column-format UI would set.
 */
export function renderNumberLikeTableCell(
  data: NumberFieldData | DecimalFieldData,
  v: any
): TableCell {
  const num = v != null ? Number(v) : null

  if (data.abbr != null) {
    return {
      type: 'text',
      align: data.align ?? 'left',
      value: num != null
        ? abbreviate(num, data.fractionDigits ?? 1, data.abbr)
        : null
    }
  }

  return {
    type: 'number',
    align: data.align ?? 'left',
    value: num,
    separator: data.separator,
    maximumFractionDigits: data.fractionDigits
  }
}

export class NumberField extends Field<NumberFieldData> {
  override tableCell(v: any, _r: any): TableCell {
    return renderNumberLikeTableCell(this.data, v)
  }

  override availableFilters(): Partial<Record<FilterOperator, FilterInput>> {
    const number = new NumberFilterInput()

    return {
      '=': number,
      '!=': number
    }
  }

  override dataListItemComponent(): any {
    throw new Error('Not implemented.')
  }

  override formInputComponent() {
    throw new Error('Not implemented.')
  }
}
