import { createRule } from '../Rule'
import { positiveInteger as basePositiveInteger } from '../validators'

export const message = {
  en: 'The value must be a valid positive integer.',
  ja: 'この値は正の整数である必要があります。'
}

export function positiveInteger(msg?: string) {
  return createRule({
    message: ({ lang }) => msg ?? message[lang],
    optional: true,
    validation: basePositiveInteger
  })
}
