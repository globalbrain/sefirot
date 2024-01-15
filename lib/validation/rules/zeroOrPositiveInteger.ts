import { createRule } from '../Rule'
import { positiveInteger as basePositiveInteger, zero } from '../validators'

export const message = {
  en: 'The value must be zero or valid positive integer.',
  ja: 'この値はゼロまたは正の整数である必要があります。',
  vi: 'Giá trị phải bằng 0 hoặc số nguyên dương hợp lệ.'
}

export function zeroOrPositiveInteger(msg?: string) {
  return createRule({
    message: ({ lang }) => msg ?? message[lang],
    validation: (value: number) => zero(value) || basePositiveInteger(value)
  })
}
