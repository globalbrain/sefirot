import { type ValidationArgs } from '@vuelidate/core'
import { defineAsyncComponent } from 'vue'
import SInputDropdown, { type Option } from '../../../components/SInputDropdown.vue'
import { required } from '../../../validation/rules'
import { FilterInput } from './FilterInput'

export class SelectFilterInput extends FilterInput {
  protected _multiple = false

  protected optionsResolver: Option[] | (() => Promise<Option[]>) = []

  multiple(): this {
    this._multiple = true
    return this
  }

  options(resolver: Option[] | (() => Promise<Option[]>)): this {
    this.optionsResolver = resolver
    return this
  }

  rules(): Record<string, ValidationArgs> {
    return {
      required: required()
    }
  }

  castValue(value: any): any {
    return this._multiple
      ? this.castValueMany(value)
      : this.castValueOne(value)
  }

  protected castValueOne(value: any): any {
    if (Array.isArray(value)) {
      return value[0]
    }
    return this.castValueToStringOrNull(value)
  }

  protected castValueMany(value: any): any {
    if (Array.isArray(value)) {
      return value
    }
    return [value]
  }

  async valueToText(value: any): Promise<string> {
    const options = await this.resolveOptions()

    return this.valueAsArray(value)
      .map((v) => options.find((o) => o.value === v)!.label)
      .join(', ')
  }

  protected valueAsArray(value: any): any[] {
    return Array.isArray(value) ? value : [value]
  }

  component(): any {
    return defineAsyncComponent(async () => {
      const options = await this.resolveOptions()
      return this.defineComponent(SInputDropdown, {
        size: 'sm',
        options
      })
    })
  }

  protected async resolveOptions(): Promise<Option[]> {
    if (typeof this.optionsResolver === 'function') {
      return await this.optionsResolver()
    }
    return this.optionsResolver
  }
}
