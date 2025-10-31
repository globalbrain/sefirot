import { type Day, isDay } from '../../support/Day'

export function after(value: unknown, date: Day): boolean {
  return isDay(value) && isDay(date) && value.isAfter(date, 'day')
}
