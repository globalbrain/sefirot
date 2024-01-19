import { createRule } from '../Rule'
import { hms as baseHms } from '../validators/hms'

type HmsType = 'h' | 'm' | 's'

export const message = {
  en: 'The time is invalid.',
  ja: '時間表記が正しくありません。'
}

export function hms(required?: HmsType[], msg?: string) {
  return createRule({
    message: ({ lang }) => msg ?? message[lang],
    validation: (value) => baseHms(value, required)
  })
}
