import { createRule } from '../Rule'
import { negativeInteger as baseNegativeInteger, zero } from '../validators'

export const message = {
  en: 'The value must be zero or valid negative integer.',
  ja: 'この値はゼロまたは負の整数である必要があります。'
}

export function zeroOrNegativeInteger(msg?: string) {
  return createRule({
    message: ({ lang }) => msg ?? message[lang],
    validation: (value) => zero(value) || baseNegativeInteger(value)
  })
}
