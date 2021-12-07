import { helpers, minLength as baseMinLength } from '@vuelidate/validators'

export function minLength(length: number) {
  return helpers.withMessage(
    ({ $params }) => {
      return `
        The value must be greater or equal to ${($params as any).min} characters.
      `
    },
    baseMinLength(length)
  )
}
