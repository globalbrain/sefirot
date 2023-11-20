import { and, decimal as baseDecimal, helpers, not } from '@vuelidate/validators'
import { isHyphen } from '../validators'

export function decimal(msg?: string) {
  return helpers.withMessage(
    () => msg ?? 'The value must be valid decimal numbers.',
    and(not(isHyphen), baseDecimal)
  )
}
