import { createRule } from '../Rule'
import { decimal as baseDecimal, hyphen } from '../validators'

export const message = {
  en: 'The value must be valid decimal numbers or just a hyphen.',
  ja: 'この値はハイフンまたは、小数および10進数である必要があります。'
}

export function decimalOrHyphen(msg?: string) {
  return createRule({
    message: ({ lang }) => msg ?? message[lang],
    validation: (value: string) => hyphen(value) || baseDecimal(value)
  })
}
