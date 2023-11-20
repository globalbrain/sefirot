export function positiveInteger(value: number): boolean {
  return Number.isInteger(value) && value > 0
}
