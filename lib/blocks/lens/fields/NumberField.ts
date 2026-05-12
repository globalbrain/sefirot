import { defineComponent, h } from 'vue'
import { type TableCell } from '../../../composables/Table'
import { type NumberFieldData } from '../FieldData'
import { type FilterOperator } from '../FilterOperator'
import LensFormOverrideNumber from '../components/LensFormOverrideNumber.vue'
import { type FilterInput } from '../filter-inputs/FilterInput'
import { NumberFilterInput } from '../filter-inputs/NumberFilterInput'
import { Field } from './Field'
import { renderNumberLikeTableCell } from './support/Renderers'

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

  /**
   * Renders the override form with extra inputs for `align`,
   * `separator`, `abbr` and `fractionDigits` on top of the base
   * label / width / freeze controls.
   */
  override overrideForm(): any {
    return defineComponent((props) => {
      return () => h(LensFormOverrideNumber, {
        name: props.name,
        field: props.field,
        override: props.override
      })
    }, {
      props: [
        'name',
        'field',
        'override'
      ]
    })
  }

  override dataListItemComponent(): any {
    throw new Error('Not implemented.')
  }

  override formInputComponent() {
    throw new Error('Not implemented.')
  }
}
