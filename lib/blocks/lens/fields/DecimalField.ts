import { defineComponent, h } from 'vue'
import { type TableCell } from '../../../composables/Table'
import { type DecimalFieldData } from '../FieldData'
import { type FilterOperator } from '../FilterOperator'
import LensFormOverrideNumber from '../components/LensFormOverrideNumber.vue'
import { type FilterInput } from '../filter-inputs/FilterInput'
import { NumberFilterInput } from '../filter-inputs/NumberFilterInput'
import { Field } from './Field'
import { renderNumberLikeTableCell } from './support/Renderers'

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
