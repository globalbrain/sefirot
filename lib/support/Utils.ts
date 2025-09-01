/** @deprecated */
export function isNumber(value: unknown): value is number {
  return Number.isFinite(value)
}

export function isObject(value: unknown): value is Record<string, unknown> {
  if (value == null || typeof value !== 'object') { return false }

  const proto = Object.getPrototypeOf(value)
  return proto === null || proto === Object.prototype
}

/** @deprecated */
export function isString(value: unknown): value is string {
  return typeof value === 'string'
}
