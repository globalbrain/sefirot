import { xor } from 'lodash-es'
import { h } from 'vue'
import SInputCheckboxes from '../../../components/SInputCheckboxes.vue'
import SInputDropdown from '../../../components/SInputDropdown.vue'
import SInputRadios from '../../../components/SInputRadios.vue'
import SState from '../../../components/SState.vue'
import { type DropdownSection } from '../../../composables/Dropdown'
import { type TableCell } from '../../../composables/Table'
import { type SelectFieldData, type SelectFieldDataOption } from '../FieldData'
import { type FilterOperator } from '../FilterOperator'
import { type FilterInput } from '../filter-inputs/FilterInput'
import { SelectFilterInput } from '../filter-inputs/SelectFilterInput'
import { Field } from './Field'

export class SelectField extends Field<SelectFieldData> {
  override async tableFilterMenu(filters: any[], onFilterUpdated: (filters: any[]) => void): Promise<DropdownSection | null> {
    const selected = this.inFilterValueFor(this.data.key, filters)

    const options = this.data.options.map((o) => ({
      label: this.labelForOption(o),
      value: o.value
    }))

    return {
      type: 'filter',
      search: false,
      selected,
      options,
      onClick: (v) => { onFilterUpdated?.([this.data.key, 'in', xor(selected, [v])]) }
    }
  }

  tableCell(v: any, _r: any): TableCell {
    if (v === null) {
      return { type: 'text', value: null }
    }

    switch (this.data.displayAs) {
      case 'state':
        return this.tableCellState(v, _r)
      case 'text':
        return this.tableCellText(v, _r)
      default:
        throw new Error(`Unknown displayAs type: ${this.data.displayAs}`)
    }
  }

  protected tableCellText(v: any, _r: any): TableCell {
    v = Array.isArray(v) ? v : [v]

    v = this.optionsForValues(v).map((o) => this.labelForOption(o)).join(', ')

    return {
      type: 'text',
      value: v
    }
  }

  protected tableCellState(v: any, _r: any): TableCell {
    if (this.data.multiple) {
      throw new Error('Displaying select field as state with multiple option is not supported.')
    }

    const option = this.optionForValue(v)

    return {
      type: 'state',
      mode: option.mode,
      label: this.labelForOption(option)
    }
  }

  availableFilters(): Partial<Record<FilterOperator, FilterInput>> {
    const options = this.data.options.map((o) => ({
      label: this.labelForOption(o),
      value: o.value
    }))

    const selectOne = new SelectFilterInput().options(options)
    const selectMany = new SelectFilterInput().options(options).multiple()

    return {
      '=': selectOne,
      '!=': selectOne,
      'in': selectMany
    }
  }

  dataListItemComponent(): any {
    return this.defineDataListItemComponent((value) => {
      if (value === null) {
        return null
      }

      switch (this.data.displayAs) {
        case 'state':
          return this.renderDataListItemValueForState(value)
        case 'text':
          return this.renderDataListItemValueForText(value)
        default:
          throw new Error(`Unknown displayAs type: ${this.data.displayAs}`)
      }
    })
  }

  protected renderDataListItemValueForState(value: any): any {
    if (this.data.multiple) {
      throw new Error('Displaying select field as state with multiple option is not supported.')
    }

    const option = this.optionForValue(value)

    return h(SState, {
      mode: option.mode,
      label: this.labelForOption(option)
    })
  }

  protected renderDataListItemValueForText(value: any): any {
    if (this.data.multiple) {
      value = Array.isArray(value) ? value : [value]
    }

    return this.optionsForValues(value).map((o) => this.labelForOption(o)).join(', ')
  }

  inputEmptyValue(): any {
    return this.data.multiple ? [] : null
  }

  formInputComponent(): any {
    switch (this.data.inputAs) {
      case 'dropdown':
        return this.defineDropdownInputComponent()
      case 'radio':
        return this.defineRadioInputComponent()
    }
  }

  defineDropdownInputComponent(): any {
    return this.defineFormInputComponent((props, { emit }) => {
      return () => h(SInputDropdown, {
        'size': 'md',
        'label': this.formInputLabel(),
        'placeholder': this.placeholder() || undefined,
        'help': this.help() || undefined,
        'options': this.data.options.map((o) => ({
          label: this.labelForOption(o),
          value: o.value
        })),
        'modelValue': props.modelValue,
        'validation': props.validation,
        'onUpdate:modelValue': (value: any) => {
          emit('update:modelValue', value)
        }
      })
    })
  }

  defineRadioInputComponent(): any {
    return this.defineFormInputComponent((props, { emit }) => {
      const Comp = this.data.multiple ? SInputCheckboxes : SInputRadios

      return () => h(Comp as any, {
        'size': 'md',
        'label': this.formInputLabel(),
        'help': this.help() || undefined,
        'options': this.data.options.map((o) => ({
          label: this.labelForOption(o),
          value: o.value
        })),
        'modelValue': props.modelValue,
        'validation': props.validation,
        'onUpdate:modelValue': (value: any) => {
          emit('update:modelValue', value)
        }
      })
    })
  }

  protected labelForOption(option: SelectFieldDataOption): string {
    return this.ctx.lang === 'ja' ? option.labelJa : option.labelEn
  }

  protected optionForValue(value: string): SelectFieldDataOption {
    const option = this.data.options.find((o) => o.value === value)

    if (!option) {
      throw new Error(`Option with value "${value}" not found in select field options.`)
    }

    return option
  }

  protected optionsForValues(values: string[]): SelectFieldDataOption[] {
    return this.data.options.filter((o) => values.includes(o.value))
  }
}
