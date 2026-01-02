import { type Day, isDay } from '../../support/Day'

export function beforeOrEqual(value: unknown, date: Day): boolean {
  return isDay(value) && isDay(date) && (value.isBefore(date, 'day') || value.isSame(date, 'day'))
}
