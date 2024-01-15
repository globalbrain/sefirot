import { type Ymd } from '../../support/Day'
import { createRule } from '../Rule'
import { requiredYmd as baseRequiredYmd } from '../validators/requiredYmd'

type YmdType = 'y' | 'm' | 'd'

export const message = {
  en: 'The field is required.',
  ja: 'この項目は必須です。',
  vi: 'Trường này là bắt buộc.'
}

export function requiredYmd(required?: YmdType[], msg?: string) {
  return createRule({
    message: ({ lang }) => msg ?? message[lang],
    optional: true,
    validation: (value: Ymd) => baseRequiredYmd(value, required)
  })
}
