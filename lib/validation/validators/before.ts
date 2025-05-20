import { isDay } from 'sefirot/support/Day'

export function before(value: unknown, date: unknown): boolean {
  if (!isDay(value) || !isDay(date)) {
    return false
  }
  return value.isBefore(date)
}
