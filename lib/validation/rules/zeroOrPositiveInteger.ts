import { helpers, or } from '@vuelidate/validators'
import { positiveInteger, zero } from '../validators'

export function zeroOrPositiveInteger(msg?: string) {
  return helpers.withMessage(
    () => msg ?? 'The value must be zero or valid positive integer.',
    or(zero, positiveInteger)
  )
}
