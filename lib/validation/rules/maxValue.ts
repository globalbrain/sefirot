import { helpers, maxValue as baseMaxValue } from '@vuelidate/validators'

export function maxValue(value: number, msg?: string) {
  return helpers.withMessage(
    ({ $params }) => {
      return msg ?? `The value must be less or equal to ${($params as any).max}.`
    },
    baseMaxValue(value)
  )
}
