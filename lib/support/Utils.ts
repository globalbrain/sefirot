/** @deprecated */
export function isNumber(value: unknown): value is number {
  return Number.isFinite(value)
}

export function isObject(value: unknown): value is Record<PropertyKey, unknown> {
  if (value == null || typeof value !== 'object') { return false }

  const proto = Object.getPrototypeOf(value)
  return proto === null || proto === Object.prototype
}

/** @deprecated */
export function isString(value: unknown): value is string {
  return typeof value === 'string'
}

export function getLength(value: unknown): number {
  if (typeof value === 'string') {
    // Count Unicode code points, not UTF-16 code units (which `String.length`
    // returns). This matches how the database measures column length (MySQL
    // `CHAR_LENGTH`, PostgreSQL `length`) and the backend's PHP `mb_strlen`.
    return [...value].length
  }
  if (Array.isArray(value)) {
    return value.length
  }
  throw new TypeError('Value must be a string or an array')
}
