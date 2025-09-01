export function month(value: unknown): boolean {
  if (!Number.isFinite(value)) { return false }

  return value > 0 && value < 13
}
