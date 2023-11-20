import { helpers } from '@vuelidate/validators'
import { negativeInteger as baseNegativeInteger } from '../validators'

export function negativeInteger(msg?: string) {
  return helpers.withMessage(
    () => msg ?? 'The value must be valid negative integer.',
    baseNegativeInteger
  )
}
