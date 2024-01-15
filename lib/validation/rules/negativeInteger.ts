import { createRule } from '../Rule'
import { negativeInteger as baseNegativeInteger } from '../validators'

export const message = {
  en: 'The value must be valid negative integer.',
  ja: 'この値は負の整数である必要があります。',
  vi: 'Giá trị phải là số nguyên âm hợp lệ.'
}

export function negativeInteger(msg?: string) {
  return createRule({
    message: ({ lang }) => msg ?? message[lang],
    validation: (value: number) => baseNegativeInteger(value)
  })
}
