import { format } from '../../support/Num'
import { createRule } from '../Rule'
import { minValue as baseMinValue } from '../validators'

export const message = {
  en: (min: string) => `The value must be greater than or equal to ${min}.`,
  ja: (min: string) => `この値は最大${min}です。`
}

export function minValue(min: number, msg?: string) {
  return createRule({
    message: ({ lang }) => msg ?? message[lang](format(min)),
    optional: true,
    validation: (value) => baseMinValue(value, min)
  })
}
