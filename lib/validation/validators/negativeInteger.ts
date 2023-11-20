export function negativeInteger(value: number): boolean {
  return Number.isInteger(value) && value < 0
}
