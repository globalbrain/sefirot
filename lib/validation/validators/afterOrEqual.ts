import { isDay } from 'sefirot/support/Day'

export function afterOrEqual(value: unknown, date: unknown): boolean {
  if (!isDay(value) || !isDay(date)) {
    return false
  }

  return value.isAfter(date) || value.isSame(date)
}
