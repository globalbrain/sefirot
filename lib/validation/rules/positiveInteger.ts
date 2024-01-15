import { createRule } from '../Rule'
import { positiveInteger as basePositiveInteger } from '../validators'

export const message = {
  en: 'The value must be valid positive integer.',
  ja: 'この値は正の整数である必要があります。'
}

export function positiveInteger(msg?: string) {
  return createRule({
    message: ({ lang }) => msg ?? message[lang],
    validation: basePositiveInteger
  })
}
