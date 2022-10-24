import { minValue as baseMinValue, helpers } from '@vuelidate/validators'

export function minValue(value: number, msg?: string) {
  return helpers.withMessage(
    ({ $params }) => {
      return msg ?? `The value must be greater or equal to ${($params as any).min}.`
    },
    baseMinValue(value)
  )
}
