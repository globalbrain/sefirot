import { createRule } from '../Rule'
import { checked as baseChecked } from '../validators/checked'

export const message = {
  en: 'You must check the field.',
  ja: 'この項目は選択が必須です。'
}

export function checked(msg?: string) {
  return createRule({
    message: ({ lang }) => msg ?? message[lang],
    optional: true,
    validation: (value: boolean) => baseChecked(value)
  })
}
