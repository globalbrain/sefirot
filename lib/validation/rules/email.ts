import { email as baseEmail, helpers } from '@vuelidate/validators'

export function email(msg?: string) {
  return helpers.withMessage(
    () => msg ?? 'The Email is invalid.',
    baseEmail
  )
}
