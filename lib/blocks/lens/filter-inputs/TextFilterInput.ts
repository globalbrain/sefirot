import { type ValidationArgs } from '@vuelidate/core'
import SInputText from '../../../components/SInputText.vue'
import { required } from '../../../validation/rules'
import { FilterInput } from './FilterInput'

export class TextFilterInput extends FilterInput {
  rules(): Record<string, ValidationArgs> {
    return {
      required: required()
    }
  }

  castValue(value: any): any {
    return this.castValueToStringOrNull(value)
  }

  async valueToText(value: any): Promise<string> {
    return value
  }

  component(): any {
    return this.defineComponent(SInputText, {
      size: 'sm'
    })
  }
}
