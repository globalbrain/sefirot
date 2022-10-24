import { url as baseUrl, helpers } from '@vuelidate/validators'

export function url(msg?: string) {
  return helpers.withMessage(
    () => msg ?? 'The URL is invalid.',
    baseUrl
  )
}
