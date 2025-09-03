import { createRule } from '../Rule'
import { positiveInteger as basePositiveInteger, zero } from '../validators'

export const message = {
  en: 'The value must be zero or a valid positive integer.',
  ja: 'この値はゼロまたは正の整数である必要があります。'
}

export function zeroOrPositiveInteger(msg?: string) {
  return createRule({
    message: ({ lang }) => msg ?? message[lang],
    optional: true,
    validation: (value) => zero(value) || basePositiveInteger(value)
  })
}
