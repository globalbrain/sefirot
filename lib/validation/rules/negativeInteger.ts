import { helpers } from '@vuelidate/validators'
import { isNegativeInteger } from '../validators'

export function negativeInteger(msg?: string) {
  return helpers.withMessage(
    () => msg ?? 'The value must be valid negative integer.',
    isNegativeInteger
  )
}
