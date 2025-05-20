import { type Day } from '../../support/Day'
import { createRule } from '../Rule'
import { afterOrEqual as baseAfterOrEqual } from '../validators/afterOrEqual'

export const message = {
  en: (date: string) => `Date must be after or equal to ${date}`,
  ja: (date: string) => `${date}より後または同じの日付でなければなりません`
}

export function afterOrEqual(date: Day, msg?: string) {
  return createRule({
    message: ({ lang }) => msg ?? message[lang](date.format('YYYY-MM-DD')),
    optional: true,
    validation: (value) => baseAfterOrEqual(value, date)
  })
}
