export function required(value: unknown, trim = true): boolean {
  if (value == null) { return false }
  if (typeof value === 'number' || value instanceof Date) { return !Number.isNaN(+value) }
  if (Array.isArray(value)) { return !!value.length }
  return trim ? !!String(value).trim() : !!String(value)
}
