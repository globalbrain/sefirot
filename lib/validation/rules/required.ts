import { helpers, required as baseRequired } from '@vuelidate/validators'

export function required(msg?: string) {
  return helpers.withMessage(
    () => msg ?? 'The field is required.',
    baseRequired
  )
}
