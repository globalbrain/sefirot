import { createRule } from '../Rule'
import { afterOrEqual as baseAfterOrEqual } from '../validators/afterOrEqual'

export const message = {
  en: 'The date must be after or equal to the specified date.',
  ja: '指定された日付よりも後または同じ日付でなければなりません。'
}

export function afterOrEqual(date: unknown, msg?: string) {
  return createRule({
    message: ({ lang }) => msg ?? message[lang],
    optional: true,
    validation: (value) => baseAfterOrEqual(value, date)
  })
}
