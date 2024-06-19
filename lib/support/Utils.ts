// @ts-expect-error internal
import baseGetTag from 'lodash-es/_baseGetTag'

import _isArray from 'lodash-es/isArray'
import _isDate from 'lodash-es/isDate'
import _isError from 'lodash-es/isError'
import _isFunction from 'lodash-es/isFunction'
import _isNil from 'lodash-es/isNil'
import _isNumber from 'lodash-es/isNumber'
import _isPlainObject from 'lodash-es/isPlainObject'
import _isString from 'lodash-es/isString'

export function isArray(value: unknown): value is unknown[] {
  return _isArray(value)
}

export function isBlob(value: unknown): value is Blob {
  return value instanceof Blob || baseGetTag(value) === '[object Blob]'
}

export function isDate(value: unknown): value is Date {
  return _isDate(value)
}

export function isError(value: unknown): value is Error {
  return _isError(value)
}

export function isFile(value: unknown): value is File {
  return value instanceof File || baseGetTag(value) === '[object File]'
}

export function isFormData(value: unknown): value is FormData {
  return value instanceof FormData || baseGetTag(value) === '[object FormData]'
}

export function isFunction(value: unknown): value is (...args: any[]) => unknown {
  return _isFunction(value)
}

export function isNullish(value: unknown): value is null | undefined {
  return _isNil(value)
}

export function isNumber(value: unknown): value is number {
  return _isNumber(value)
}

export function isObject(value: unknown): value is Record<string, unknown> {
  return _isPlainObject(value)
}

export function isString(value: unknown): value is string {
  return _isString(value)
}
