export function minValue(value: unknown, min: number) {
  if (Number.isFinite(value) || typeof value === 'string' || value instanceof Date) {
    return +value >= min
  }

  return false
}
