import { createRule } from '../Rule'
import { url as baseUrl } from '../validators'

export const message = {
  en: 'The value is invalid.',
  ja: 'この値は正しくありません。'
}

export function url(msg?: string) {
  return createRule({
    message: ({ lang }) => msg ?? message[lang],
    validation: (value: string) => baseUrl(value)
  })
}
