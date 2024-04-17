import { type HmsType } from '../../support/Day'
import { createRule } from '../Rule'
import { type RequiredIfCondition, requiredHmsIf as baseRequiredHmsIf } from '../validators'

export const message = {
  en: 'The field is required.',
  ja: 'この項目は必須です。'
}

export function requiredHmsIf(condition: RequiredIfCondition, required?: HmsType[], msg?: string) {
  return createRule({
    async: true,
    params: { condition },
    message: ({ lang }) => msg ?? message[lang],
    validation: (value) => baseRequiredHmsIf(value, condition, required)
  })
}
