export function maxValue(value: unknown, max: number) {
  if (typeof value === 'string' || value instanceof Date) {
    return +value <= max
  }

  return false
}
