import { type HmsType } from '../../support/Day'
import { createRule } from '../Rule'
import { hms as baseHms } from '../validators/hms'

export const message = {
  en: 'The field is required.',
  ja: 'この項目は必須です。'
}

export function requiredHms(required?: HmsType[], msg?: string) {
  return createRule({
    message: ({ lang }) => msg ?? message[lang],
    validation: (value) => baseHms(value, required, true)
  })
}
