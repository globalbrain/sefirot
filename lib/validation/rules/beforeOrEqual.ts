import { type Day } from '../../support/Day'
import { createRule } from '../Rule'
import { beforeOrEqual as baseBeforeOrEqual } from '../validators/beforeOrEqual'

export const message = {
  en: (date: string) => `Date must be before or equal to ${date}.`,
  ja: (date: string) => `${date}より前、または同じ日付を指定してください。`
}

export function beforeOrEqual(date: Day, msg?: string) {
  return createRule({
    message: ({ lang }) => msg ?? message[lang](date.format('YYYY-MM-DD')),
    optional: true,
    validation: (value) => baseBeforeOrEqual(value, date)
  })
}
