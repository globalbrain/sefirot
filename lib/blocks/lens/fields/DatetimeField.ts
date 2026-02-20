import { type TableCell } from '../../../composables/Table'
import { day } from '../../../support/Day'
import { type DatetimeFieldData } from '../FieldData'
import { type FilterOperator } from '../FilterOperator'
import { type FilterInput } from '../filter-inputs/FilterInput'
import { TextFilterInput } from '../filter-inputs/TextFilterInput'
import { Field } from './Field'

export class DatetimeField extends Field<DatetimeFieldData> {
  override tableCell(v: any, _r: any): TableCell {
    return {
      type: 'day',
      value: v ? day(v) : null
    }
  }

  override availableFilters(): Partial<Record<FilterOperator, FilterInput>> {
    const text = new TextFilterInput()

    return {
      '=': text,
      '!=': text
    }
  }

  override dataListItemComponent(): any {
    return this.defineDataListItemComponent((value) => {
      return value ? day(value).format('YYYY-MM-DD') : ''
    })
  }

  override formInputComponent(): any {
    throw new Error('Not implemented.')
  }
}
