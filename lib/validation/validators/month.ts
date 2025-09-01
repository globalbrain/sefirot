export function month(value: unknown): boolean {
  return Number.isInteger(value) && value > 0 && value < 13
}
