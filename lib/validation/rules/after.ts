import { type Day } from '../../support/Day'
import { createRule } from '../Rule'
import { after as baseAfter } from '../validators/after'

export const message = {
  en: (date: string) => `Date must be after ${date}`,
  ja: (date: string) => `${date}より後の日付でなければなりません`
}

export function after(date: Day, msg?: string) {
  return createRule({
    message: ({ lang }) => msg ?? message[lang](date.format('YYYY-MM-DD')),
    optional: true,
    validation: (value) => baseAfter(value, date)
  })
}
