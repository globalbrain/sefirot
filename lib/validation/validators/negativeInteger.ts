export function negativeInteger(value: unknown): boolean {
  if (!Number.isFinite(value)) { return false }

  return Number.isInteger(value) && value < 0
}
