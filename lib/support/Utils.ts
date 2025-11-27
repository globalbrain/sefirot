// eslint-disable-next-line ts/ban-ts-comment
// @ts-ignore internal
import baseGetTag from 'lodash-es/_baseGetTag'

import _isDate from 'lodash-es/isDate'
import _isError from 'lodash-es/isError'
import _isNumber from 'lodash-es/isNumber'
import _isPlainObject from 'lodash-es/isPlainObject'
import _isString from 'lodash-es/isString'

export function isBlob(value: unknown): value is Blob {
  return value instanceof Blob || baseGetTag(value) === '[object Blob]'
}

export function isDate(value: unknown): value is Date {
  return _isDate(value)
}

export function isError<T extends Error = Error>(value: unknown): value is T {
  return _isError(value)
}

export function isFile(value: unknown): value is File {
  return value instanceof File || baseGetTag(value) === '[object File]'
}

export function isFormData(value: unknown): value is FormData {
  return value instanceof FormData || baseGetTag(value) === '[object FormData]'
}

export function isNumber(value: unknown): value is number {
  return _isNumber(value)
}

export function isObject(value: unknown): value is Record<string, unknown> {
  return _isPlainObject(value)
}

export function isRequest(value: unknown): value is Request {
  return value instanceof Request || baseGetTag(value) === '[object Request]'
}

export function isResponse(value: unknown): value is Response {
  return value instanceof Response || baseGetTag(value) === '[object Response]'
}

export function isString(value: unknown): value is string {
  return _isString(value)
}
