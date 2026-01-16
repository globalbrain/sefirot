export function negativeInteger(value: unknown): boolean {
  return Number.isInteger(value) && value < 0 && value >= Number.MIN_SAFE_INTEGER
}
