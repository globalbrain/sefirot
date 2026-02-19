import { h } from 'vue'
import SInputDate from '../../../components/SInputDate.vue'
import { type TableCell } from '../../../composables/Table'
import { day } from '../../../support/Day'
import { type DateFieldData } from '../FieldData'
import { type FilterOperator } from '../FilterOperator'
import { type FilterInput } from '../filter-inputs/FilterInput'
import { TextFilterInput } from '../filter-inputs/TextFilterInput'
import { Field } from './Field'

export class DateField extends Field<DateFieldData> {
  tableCell(v: any, _r: any): TableCell {
    return {
      type: 'day',
      value: v ? day(v) : null,
      format: 'YYYY-MM-DD'
    }
  }

  availableFilters(): Partial<Record<FilterOperator, FilterInput>> {
    const text = new TextFilterInput()

    return {
      '=': text,
      '!=': text
    }
  }

  dataListItemComponent(): any {
    return this.defineDataListItemComponent((value) => {
      return value ? day(value).format('YYYY-MM-DD') : ''
    })
  }

  inputToPayload(value: any): any {
    if (value === null) {
      return null
    }

    return value.format('YYYY-MM-DD')
  }

  payloadToInput(value: any): any {
    if (value === null) {
      return null
    }

    return day(value)
  }

  formInputComponent(): any {
    return this.defineFormInputComponent((props, { emit }) => {
      return () => h(SInputDate, {
        'size': 'md',
        'label': this.formInputLabel(),
        'placeholder': this.placeholder() || undefined,
        'help': this.help() || undefined,
        'modelValue': props.modelValue,
        'validation': props.validation,
        'onUpdate:modelValue': (value: any) => {
          emit('update:modelValue', value)
        }
      })
    })
  }
}
