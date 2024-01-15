import { createRule } from '../Rule'
import { maxValue as baseMaxValue } from '../validators'

export const message = {
  en: (max: number) => `The value must be less than or equal to ${max}.`,
  ja: (max: number) => `この値は最大${max}です。`,
  vi: (max: number) => `Giá trị phải nhỏ hơn hoặc bằng ${max}.`
}

export function maxValue(max: number, msg?: string) {
  return createRule({
    message: ({ lang }) => msg ?? message[lang](max),
    validation: (value: unknown) => baseMaxValue(value, max)
  })
}
