import { createRule } from '../Rule'
import { negativeInteger as baseNegativeInteger, zero } from '../validators'

export const message = {
  en: 'The value must be zero or valid negative integer.',
  ja: 'この値はゼロまたは負の整数である必要があります。',
  vi: 'Giá trị phải bằng 0 hoặc số nguyên âm hợp lệ.'
}

export function zeroOrNegativeInteger(msg?: string) {
  return createRule({
    message: ({ lang }) => msg ?? message[lang],
    validation: (value: number) => zero(value) || baseNegativeInteger(value)
  })
}
