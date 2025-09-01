export function minLength(value: unknown, length: number): boolean {
  if (!(typeof value === 'string' || Array.isArray(value))) { return false }

  return value.length >= length
}
