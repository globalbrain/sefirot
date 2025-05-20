import { createRule } from '../Rule'
import { before as baseBefore } from '../validators/before'

export const message = {
  en: 'The date must be before the specified date.',
  ja: '指定された日付よりも前の日付でなければなりません。'
}

export function before(date: unknown, msg?: string) {
  return createRule({
    message: ({ lang }) => msg ?? message[lang],
    optional: true,
    validation: (value) => baseBefore(value, date)
  })
}
