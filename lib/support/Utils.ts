export function isNullish(value: unknown): value is undefined | null {
  return value === null || value === undefined
}

export function isString(value: unknown): value is string {
  return typeof value === 'string'
}

export function isNumber(value: unknown): value is number {
  return typeof value === 'number'
}

export function isArray(value: unknown): value is unknown[] {
  return Array.isArray(value)
}
