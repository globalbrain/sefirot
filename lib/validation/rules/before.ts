import { type Day } from '../../support/Day'
import { createRule } from '../Rule'
import { before as baseBefore } from '../validators/before'

export const message = {
  en: (date: string) => `Date must be before ${date}.`,
  ja: (date: string) => `${date}より前の日付を指定してください。`
}

export function before(date: Day, msg?: string) {
  return createRule({
    message: ({ lang }) => msg ?? message[lang](date.format('YYYY-MM-DD')),
    optional: true,
    validation: (value) => baseBefore(value, date)
  })
}
