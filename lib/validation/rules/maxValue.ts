import { format } from '../../support/Num'
import { createRule } from '../Rule'
import { maxValue as baseMaxValue } from '../validators'

export const message = {
  en: (max: string) => `The value must be less than or equal to ${max}.`,
  ja: (max: string) => `この値は最大${max}です。`
}

export function maxValue(max: number, msg?: string) {
  return createRule({
    message: ({ lang }) => msg ?? message[lang](format(max)),
    optional: true,
    validation: (value) => baseMaxValue(value, max)
  })
}
