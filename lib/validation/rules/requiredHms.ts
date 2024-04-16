import { type HmsType } from '../../support/Day'
import { createRule } from '../Rule'
import { requiredHms as baseRequiredHms } from '../validators/requiredHms'

export const message = {
  en: 'The field is required.',
  ja: 'この項目は必須です。'
}

export function requiredHms(required?: HmsType[], msg?: string) {
  return createRule({
    message: ({ lang }) => msg ?? message[lang],
    validation: (value) => baseRequiredHms(value, required)
  })
}
