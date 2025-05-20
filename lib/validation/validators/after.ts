import { isDay } from 'sefirot/support/Day'

export function after(value: unknown, date: unknown): boolean {
  if (!isDay(value) || !isDay(date)) {
    return false
  }

  return value.isAfter(date)
}
