import { createRule } from '../Rule'
import { after as baseAfter } from '../validators/after'

export const message = {
  en: 'The date must be after the specified date.',
  ja: '指定された日付よりも後の日付でなければなりません。'
}

export function after(date: unknown, msg?: string) {
  return createRule({
    message: ({ lang }) => msg ?? message[lang],
    optional: true,
    validation: (value) => baseAfter(value, date)
  })
}
