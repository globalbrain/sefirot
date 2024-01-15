import { createRule } from '../Rule'
import { minValue as baseMinValue } from '../validators'

export const message = {
  en: (min: number) => `The value must be greater than or equal to ${min}.`,
  ja: (min: number) => `この値は最大${min}です。`,
  vi: (min: number) => `Giá trị phải lớn hơn hoặc bằng ${min}.`
}

export function minValue(min: number, msg?: string) {
  return createRule({
    message: ({ lang }) => msg ?? message[lang](min),
    validation: (value: unknown) => baseMinValue(value, min)
  })
}
