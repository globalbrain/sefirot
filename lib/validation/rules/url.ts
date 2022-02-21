import { helpers, url as baseUrl } from '@vuelidate/validators'

export function url(msg?: string) {
  return helpers.withMessage(
    () => msg ?? 'The URL is invalid.',
    baseUrl
  )
}
