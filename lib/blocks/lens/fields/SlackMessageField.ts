import { h } from 'vue'
import SLink from '../../../components/SLink.vue'
import { type TableCell } from '../../../composables/Table'
import { type SlackMessageFieldData } from '../FieldData'
import { type FilterOperator } from '../FilterOperator'
import { type FilterInput } from '../filter-inputs/FilterInput'
import { Field } from './Field'

export class SlackMessageField extends Field<SlackMessageFieldData> {
  override tableCell(v: any, _r: any): TableCell {
    return {
      type: 'text',
      value: v,
      link: v,
      color: 'info'
    }
  }

  override availableFilters(): Partial<Record<FilterOperator, FilterInput>> {
    return {}
  }

  override dataListItemComponent(): any {
    return this.defineDataListItemComponent((value) => {
      return h(SLink, { href: value }, () => value)
    }, {
      lineClamp: 1
    })
  }

  override formInputComponent(): any {
    throw new Error('Not implemented.')
  }
}
