export function format(value: number): string {
  return value.toLocaleString('en-US', { maximumFractionDigits: 20 })
}

export function abbreviate(value: number, precision = 0): string {
  return value.toLocaleString('en-US', {
    notation: 'compact',
    maximumFractionDigits: precision
  })
}
