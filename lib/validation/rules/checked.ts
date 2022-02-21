import { helpers } from '@vuelidate/validators'
import { checked as baseChecked } from '../validators/checked'

export function checked(msg?: string) {
  return helpers.withMessage(
    () => msg ?? 'You must check the field.',
    (value: boolean) => !helpers.req(value) || baseChecked(value)
  )
}
