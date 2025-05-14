import { createRule } from '../Rule'
import { ymd as baseYmd } from '../validators/ymd'

type YmdType = 'y' | 'm' | 'd'

export const message = {
  en: 'The date is invalid.',
  ja: '日付表記が正しくありません。'
}

export function ymd(required?: YmdType[], msg?: string) {
  return createRule({
    message: ({ lang }) => msg ?? message[lang],
    optional: true,
    validation: (value) => baseYmd(value, required)
  })
}
