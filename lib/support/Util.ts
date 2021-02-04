export { default as isEqual } from 'lodash-es/isEqual'
export { default as cloneDeep } from 'lodash-es/cloneDeep'

export function isNullish(value: any): value is undefined | null {
  return value === null || value === undefined
}

export function isString(value: any): value is string {
  return typeof value === 'string'
}

export function isArray(value: any): value is any[] {
  return Array.isArray(value)
}
