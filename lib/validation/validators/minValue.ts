import { decimal } from './decimal'

export function minValue(value: unknown, min: number) {
  return (decimal(value) || value instanceof Date) && Number(value) >= min
}
