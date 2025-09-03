export function required(value: unknown): boolean {
  if (Array.isArray(value)) { return !!value.length }
  if (value == null) { return false }
  if (typeof value === 'number' || value instanceof Date) { return !Number.isNaN(+value) }
  return !!String(value).trim().length
}
