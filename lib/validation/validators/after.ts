import { type Day, isDay } from '../../support/Day'

export function after(value: unknown, date: Day): boolean {
  if (!isDay(value) || !isDay(date)) { return false }

  return value.isAfter(date, 'day')
}
