import { h } from 'vue'
import SInputText from '../../../components/SInputText.vue'
import SLink from '../../../components/SLink.vue'
import { type TableCell } from '../../../composables/Table'
import { type LinkFieldData } from '../FieldData'
import { type FilterOperator } from '../FilterOperator'
import { type FilterInput } from '../filter-inputs/FilterInput'
import { TextFilterInput } from '../filter-inputs/TextFilterInput'
import { Field } from './Field'

export class LinkField extends Field<LinkFieldData> {
  override tableCell(v: any, _r: any): TableCell {
    return {
      type: 'text',
      value: v,
      link: v,
      color: 'info'
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
      return h(SLink, { href: value }, () => value)
    }, {
      lineClamp: 1
    })
  }

  override formInputComponent(): any {
    return this.defineFormInputComponent((props, { emit }) => {
      return () => h(SInputText, {
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
