import { type TableCell } from '../../../composables/Table'
import { type DecimalFieldData } from '../FieldData'
import { type FilterOperator } from '../FilterOperator'
import { type FilterInput } from '../filter-inputs/FilterInput'
import { NumberFilterInput } from '../filter-inputs/NumberFilterInput'
import { Field } from './Field'
import { renderNumberLikeTableCell } from './NumberField'

/**
 * A decimal field is rendered identically to a number field on the
 * client — `renderNumberLikeTableCell` covers both. The type exists so
 * backends can preserve arbitrary precision (e.g. send the value as a
 * string instead of a JS number) without losing the type-level signal
 * at the spec layer.
 */
export class DecimalField extends Field<DecimalFieldData> {
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
