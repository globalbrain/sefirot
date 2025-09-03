export function minLength(value: unknown, length: number): boolean {
  return (typeof value === 'string' || Array.isArray(value)) && value.length >= length
}
