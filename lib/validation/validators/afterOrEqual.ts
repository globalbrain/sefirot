import { type Day, isDay } from '../../support/Day'

export function afterOrEqual(value: unknown, date: Day): boolean {
  return isDay(value) && isDay(date) && (value.isAfter(date, 'day') || value.isSame(date, 'day'))
}
