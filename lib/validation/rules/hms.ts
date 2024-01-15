import { type Hms } from '../../support/Day'
import { createRule } from '../Rule'
import { hms as baseHms } from '../validators/hms'

// TODO: for Japanese. We need to fix the logic a bit so it displays correctly.
// Format: %h時%m分%s秒
// Example: 12時30分18秒
type HmsType = 'h' | 'm' | 's'

export const message = {
  en: 'The time is invalid.',
  ja: '時間表記が正しくありません。',
  vi: 'Thời gian không hợp lệ.'
}

export function hms(required?: HmsType[], msg?: string) {
  return createRule({
    message: ({ lang }) => msg ?? message[lang],
    optional: true,
    validation: (value: Hms) => baseHms(value, required)
  })
}
