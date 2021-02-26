export { default as isEqual } from 'lodash-es/isEqual'
export { default as cloneDeep } from 'lodash-es/cloneDeep'
export { default as orderBy } from 'lodash-es/orderBy'
export { default as groupBy } from 'lodash-es/groupBy'

export function isNullish(value: unknown): value is undefined | null {
  return value === null || value === undefined
}

export function isString(value: unknown): value is string {
  return typeof value === 'string'
}

export function isArray(value: unknown): value is unknown[] {
  return Array.isArray(value)
}
