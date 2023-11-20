import { helpers, or } from '@vuelidate/validators'
import { isNegativeInteger, isZero } from '../validators'

export function zeroOrNegativeInteger(msg?: string) {
  return helpers.withMessage(
    () => msg ?? 'The value must be zero or valid negative integer.',
    or(isZero, isNegativeInteger)
  )
}
