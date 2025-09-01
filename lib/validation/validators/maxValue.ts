export function maxValue(value: unknown, max: number) {
  if (Number.isFinite(value) || typeof value === 'string' || value instanceof Date) {
    return +value <= max
  }

  return false
}
