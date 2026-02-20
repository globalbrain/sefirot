import { type TableCell } from '../../../composables/Table'
import { type IdFieldData } from '../FieldData'
import { type FilterOperator } from '../FilterOperator'
import { type FilterInput } from '../filter-inputs/FilterInput'
import { NumberFilterInput } from '../filter-inputs/NumberFilterInput'
import { Field } from './Field'

export class IdField extends Field<IdFieldData> {
  override tableCell(v: any, _r: any): TableCell {
    return {
      type: 'text',
      value: v.display,
      link: v.path,
      color: 'info'
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
