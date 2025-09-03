import { createRule } from '../Rule'
import { decimal as baseDecimal } from '../validators'

export const message = {
  en: 'The value must be a valid decimal number.',
  ja: 'この値は小数または10進数である必要があります。'
}

export function decimal(msg?: string) {
  return createRule({
    message: ({ lang }) => msg ?? message[lang],
    optional: true,
    validation: (value) => baseDecimal(value)
  })
}
