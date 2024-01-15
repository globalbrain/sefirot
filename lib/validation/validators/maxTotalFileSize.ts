import { isFile } from '../../support/Utils'

/**
 * Validates if the total size of the given files is smaller than the
 * given size.
 */
export function maxTotalFileSize(value: unknown, size: string): boolean {
  if (!isArrayOfFiles(value)) {
    return false
  }

  const factor = /gb/i.test(size)
    ? 1e9
    : /mb/i.test(size)
      ? 1e6
      : /kb/i.test(size)
        ? 1e3
        : 1

  const total = value.reduce((total, file) => total + file.size, 0)

  return total <= factor * +size.replace(/[^\d\.]/g, '')
}

function isArrayOfFiles(value: unknown): value is File[] {
  return Array.isArray(value) && value.every((v) => isFile(v))
}
