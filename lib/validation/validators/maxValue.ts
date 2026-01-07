import { decimal } from './decimal'

export function maxValue(value: unknown, max: number) {
  return (decimal(value) || value instanceof Date) && Number(value) <= max
}
