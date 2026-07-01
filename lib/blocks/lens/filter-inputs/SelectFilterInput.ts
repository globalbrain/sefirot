import { type ValidationArgs } from '@vuelidate/core'
import { defineAsyncComponent } from 'vue'
import SInputDropdown from '../../../components/SInputDropdown.vue'
import { type Option } from '../../../support/Option'
import { required } from '../../../validation/rules'
import { isAuthError } from '../validation/ServerErrors'
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
    // Preserve the value's type. Option values can be non-string (e.g.
    // numeric related-record ids); stringifying here would break strict
    // option matching in the dropdown summary and send the wrong type to
    // the backend.
    return value ?? null
  }

  protected castValueMany(value: any): any {
    if (value == null) {
      return []
    }
    if (Array.isArray(value)) {
      return value
    }
    return [value]
  }

  async valueToText(value: any): Promise<string> {
    // Degrade gracefully: if the options can't be fetched, or the applied filter
    // value isn't among them (the option set changed, or the referenced record was
    // deleted), fall back to the raw value instead of asserting — a throw here
    // leaves the filter chip stuck on its loading placeholder forever.
    let options: Option[] = []
    try {
      options = await this.resolveOptions()
    } catch (e) {
      // Let auth / session-expiry failures reach the app's error / re-auth flow
      // instead of silently degrading to raw values. Other failures — an option
      // miss or a non-auth fetch error — fall back so the chip stays readable.
      if (isAuthError(e)) {
        throw e
      }
      options = []
    }

    return this.valueAsArray(value)
      .map((v) => options.find((o) => o.value === v)?.label ?? String(v))
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
