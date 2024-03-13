import { createRule } from '../Rule'
import { type RequiredIfCondition, requiredIf as baseRequiredIf } from '../validators'

export const message = {
  en: 'The field is required.',
  ja: 'この項目は必須です。'
}

export function requiredIf(
  condition: RequiredIfCondition,
  msg?: string
) {
  return createRule({
    async: true,
    message: ({ lang }) => msg ?? message[lang],
    validation: (value) => baseRequiredIf(value, condition)
  })
}
