import { helpers, maxLength as baseMaxLength } from '@vuelidate/validators'

export function maxLength(length: number) {
  return helpers.withMessage(
    ({ $params }) => {
      return `
        The value must be less or equal to ${($params as any).max} characters.
      `
    },
    baseMaxLength(length)
  )
}
