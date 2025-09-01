export function decimal(value: unknown): boolean {
  return (
    Number.isFinite(value)
    || (typeof value === 'string' && value.length > 0 && Number.isFinite(Number(value)))
  )
}
