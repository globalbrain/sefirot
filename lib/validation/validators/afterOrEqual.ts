import { type Day, isDay } from '../../support/Day'

export function afterOrEqual(value: unknown, date: Day): boolean {
  if (!isDay(value) || !isDay(date)) { return false }

  return value.isAfter(date, 'day') || value.isSame(date, 'day')
}
