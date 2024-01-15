import { createRule } from '../Rule'
import { decimal as baseDecimal, hyphen } from '../validators'

export const message = {
  en: 'The value must be valid decimal numbers or just a hyphen.',
  ja: 'この値は小数、10進数、またはハイフンである必要があります。',
  vi: 'Giá trị phải là số thập phân hợp lệ hoặc chỉ là dấu gạch nối.'
}

export function decimalOrHyphen(msg?: string) {
  return createRule({
    message: ({ lang }) => msg ?? message[lang],
    validation: (value: string) => hyphen(value) || baseDecimal(value)
  })
}
