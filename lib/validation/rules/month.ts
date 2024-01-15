import { createRule } from '../Rule'
import { month as baseMonth } from '../validators'

export const message = {
  en: 'The month is invalid.',
  ja: '月が正しくありません。',
  vi: 'The month is invalid.'
}

export function month(msg?: string) {
  return createRule({
    message: ({ lang }) => msg ?? message[lang],
    optional: true,
    validation: (value: number) => baseMonth(value)
  })
}
