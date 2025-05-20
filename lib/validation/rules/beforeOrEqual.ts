import { createRule } from '../Rule'
import { beforeOrEqual as baseBeforeOrEqual } from '../validators/beforeOrEqual'

export const message = {
  en: 'The date must be before or equal to the specified date.',
  ja: '指定された日付よりも前または同じ日付でなければなりません。'
}

export function beforeOrEqual(date: unknown, msg?: string) {
  return createRule({
    message: ({ lang }) => msg ?? message[lang],
    optional: true,
    validation: (value) => baseBeforeOrEqual(value, date)
  })
}
