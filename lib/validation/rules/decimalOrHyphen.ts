import { createRule } from '../Rule'
import { decimal as baseDecimal, hyphen } from '../validators'

export const message = {
  en: 'The value must be valid decimal numbers or just a hyphen.',
  ja: 'この値は小数、10進数、またはハイフンである必要があります。'
}

export function decimalOrHyphen(msg?: string) {
  return createRule({
    message: ({ lang }) => msg ?? message[lang],
    optional: true,
    validation: (value) => hyphen(value) || baseDecimal(value)
  })
}
