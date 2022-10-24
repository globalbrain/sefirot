import { minLength as baseMinLength, helpers } from '@vuelidate/validators'

export function minLength(length: number, msg?: string) {
  return helpers.withMessage(
    ({ $params }) => {
      return msg ?? `The value must be greater or equal to ${($params as any).min} characters.`
    },
    baseMinLength(length)
  )
}
