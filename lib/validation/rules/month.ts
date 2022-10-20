import { helpers } from '@vuelidate/validators'
import { month as baseMonth } from '../validators/month'

export function month(msg?: string) {
  return helpers.withMessage(
    () => msg ?? 'The month is invalid.',
    (value: number) => {
      return !helpers.req(value) || baseMonth(value)
    }
  )
}
