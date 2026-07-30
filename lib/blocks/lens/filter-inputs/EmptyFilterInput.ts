import { type ValidationArgs } from '@vuelidate/core'
import { FilterInput } from './FilterInput'

/**
 * The filter input for the valueless `empty` / `notEmpty` operators (see
 * `isValuelessFilterOperator`). The condition is complete with just the
 * field and the operator, so this input requires no value, renders no
 * control, and always normalizes the condition value back to `null`.
 */
export class EmptyFilterInput extends FilterInput {
  rules(): Record<string, ValidationArgs> {
    return {}
  }

  castValue(_value: any): any {
    return null
  }

  async valueToText(_value: any): Promise<string> {
    return ''
  }

  component(): any {
    return null
  }
}
