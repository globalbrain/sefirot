import { type Day, isDay } from '../../support/Day'

export function beforeOrEqual(value: unknown, date: Day): boolean {
  if (!isDay(value) || !isDay(date)) { return false }

  return value.isBefore(date, 'day') || value.isSame(date, 'day')
}
