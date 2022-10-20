import { helpers } from '@vuelidate/validators'

export function rule(validation: (value: any) => boolean, msg?: string) {
  return helpers.withMessage(
    () => msg ?? 'The value is invalid.',
    (value: any) => !helpers.req(value) || validation(value)
  )
}
