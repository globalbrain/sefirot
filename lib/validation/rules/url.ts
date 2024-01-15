import { createRule } from '../Rule'
import { url as baseUrl } from '../validators'

export const message = {
  en: 'The URL is invalid.',
  ja: 'URLの形式が正しくありません。',
  vi: 'URL không hợp lệ.'
}

export function url(msg?: string) {
  return createRule({
    message: ({ lang }) => msg ?? message[lang],
    validation: (value: string) => baseUrl(value)
  })
}
