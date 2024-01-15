export function minValue(value: unknown, min: number) {
  if (typeof value === 'string' || value instanceof Date) {
    return +value >= min
  }

  return false
}
