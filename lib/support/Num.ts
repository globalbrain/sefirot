export function format(value: number): string {
  return value.toLocaleString('en-US', { maximumFractionDigits: 20 })
}
