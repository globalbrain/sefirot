export function positiveInteger(value: unknown): boolean {
  return Number.isInteger(value) && value > 0 && value <= Number.MAX_SAFE_INTEGER
}
