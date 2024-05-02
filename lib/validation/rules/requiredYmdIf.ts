import { type YmdType } from '../../support/Day'
import { createRule } from '../Rule'
import { type RequiredIfCondition, requiredYmdIf as baseRequiredYmdIf } from '../validators'

export const message = {
  en: 'The field is required.',
  ja: 'この項目は必須です。'
}

export function requiredYmdIf(condition: RequiredIfCondition, required?: YmdType[], msg?: string) {
  return createRule({
    async: true,
    params: { condition },
    message: ({ lang }) => msg ?? message[lang],
    validation: (value) => baseRequiredYmdIf(value, condition, required)
  })
}
