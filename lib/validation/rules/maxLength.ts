import { maxLength as baseMaxLength, helpers } from '@vuelidate/validators'

export function maxLength(length: number, msg?: string) {
  return helpers.withMessage(
    ({ $params }) => {
      return msg ?? `The value must be less or equal to ${($params as any).max} characters.`
    },
    baseMaxLength(length)
  )
}
