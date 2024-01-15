import { createRule } from '../Rule'
import { month as baseMonth } from '../validators'

export const message = {
  en: 'The month is invalid.',
  ja: '月が正しくありません。'
}

export function month(msg?: string) {
  return createRule({
    message: ({ lang }) => msg ?? message[lang],
    optional: true,
    validation: (value: number) => baseMonth(value)
  })
}
