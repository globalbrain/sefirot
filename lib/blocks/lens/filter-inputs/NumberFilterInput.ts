import { type ValidationArgs } from '@vuelidate/core'
import SInputNumber from '../../../components/SInputNumber.vue'
import { required } from '../../../validation/rules'
import { FilterInput } from './FilterInput'

export class NumberFilterInput extends FilterInput {
  rules(): Record<string, ValidationArgs> {
    return {
      required: required()
    }
  }

  castValue(value: any): any {
    return this.castValueToNumberOrNull(value)
  }

  async valueToText(value: any): Promise<string> {
    return value
  }

  component(): any {
    return this.defineComponent(SInputNumber, {
      size: 'sm'
    })
  }
}
