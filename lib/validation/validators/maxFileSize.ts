import { isFile } from '../../support/Utils'

export function maxFileSize(value: unknown, size: string): boolean {
  if (!isFile(value)) {
    return false
  }

  const factor = /gb/i.test(size)
    ? 1e9
    : /mb/i.test(size)
      ? 1e6
      : /kb/i.test(size)
        ? 1e3
        : 1

  return value.size <= factor * +size.replace(/[^\d\.]/g, '')
}
