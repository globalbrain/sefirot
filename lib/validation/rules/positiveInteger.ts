import { helpers } from '@vuelidate/validators'
import { isPositiveInteger } from '../validators'

export function positiveInteger(msg?: string) {
  return helpers.withMessage(
    () => msg ?? 'The value must be valid positive integer.',
    isPositiveInteger
  )
}
