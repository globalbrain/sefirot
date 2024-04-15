import { type YmdType } from '../../support/Day'
import { createRule } from '../Rule'
import { requiredYmd as baseRequiredYmd } from '../validators/requiredYmd'

export const message = {
  en: 'The field is required.',
  ja: 'この項目は必須です。'
}

export function requiredYmd(required?: YmdType[], msg?: string) {
  return createRule({
    message: ({ lang }) => msg ?? message[lang],
    validation: (value) => baseRequiredYmd(value, required)
  })
}
