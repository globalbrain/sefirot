import { type TableCell } from '../../../composables/Table'
import { type NumberFieldData } from '../FieldData'
import { type FilterOperator } from '../FilterOperator'
import { type FilterInput } from '../filter-inputs/FilterInput'
import { NumberFilterInput } from '../filter-inputs/NumberFilterInput'
import { Field } from './Field'

export class NumberField extends Field<NumberFieldData> {
  override tableCell(v: any, _r: any): TableCell {
    return {
      type: 'number',
      value: v
    }
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
