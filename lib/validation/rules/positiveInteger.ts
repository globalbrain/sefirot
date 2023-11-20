import { helpers } from '@vuelidate/validators'
import { positiveInteger as basePositiveInteger } from '../validators'

export function positiveInteger(msg?: string) {
  return helpers.withMessage(
    () => msg ?? 'The value must be valid positive integer.',
    basePositiveInteger
  )
}
