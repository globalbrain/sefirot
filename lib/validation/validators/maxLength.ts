export function maxLength(value: unknown, length: number): boolean {
  return (typeof value === 'string' || Array.isArray(value)) && value.length <= length
}
