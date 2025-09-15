import { createRule } from '../Rule'
import { negativeInteger as baseNegativeInteger } from '../validators'

export const message = {
  en: 'The value must be a valid negative integer.',
  ja: 'この値は負の整数である必要があります。'
}

export function negativeInteger(msg?: string) {
  return createRule({
    message: ({ lang }) => msg ?? message[lang],
    optional: true,
    validation: baseNegativeInteger
  })
}
