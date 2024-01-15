import { createRule } from '../Rule'
import { required as baseRequired } from '../validators'

export const message = {
  en: 'The field is required.',
  ja: 'この項目は必須です。',
  vi: 'Trường này là bắt buộc.'
}

export function required(msg?: string) {
  return createRule({
    message: ({ lang }) => msg ?? message[lang],
    validation: (value) => baseRequired(value)
  })
}
