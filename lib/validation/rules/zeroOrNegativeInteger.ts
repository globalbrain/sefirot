import { helpers, or } from '@vuelidate/validators'
import { negativeInteger, zero } from '../validators'

export function zeroOrNegativeInteger(msg?: string) {
  return helpers.withMessage(
    () => msg ?? 'The value must be zero or valid negative integer.',
    or(zero, negativeInteger)
  )
}
