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

  // The value is a `{ value, display, path }` object and the cell renders only
  // its `display`, so a record whose identifier has no display yet is blank.
  protected override isEmptyTableValue(v: any, _r: any): boolean {
    return v == null || v.display == null || v.display === ''
  }

  // Keep the `path` link, so the empty text still navigates to the record.
  protected override tableEmptyCell(text: string, v: any, _r: any): TableCell {
    return { type: 'text', value: text, link: v?.path ?? null, color: 'mute' }
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
