/**
 * Validates if the total size of the given files is smaller than the
 * given size.
 */
export function maxTotalFileSize(files: File[], size: string): boolean {
  const factor = /gb/i.test(size)
    ? 1e9
    : /mb/i.test(size)
      ? 1e6
      : /kb/i.test(size)
        ? 1e3
        : 1

  const total = files.reduce((total, file) => total + file.size, 0)

  return total <= factor * +size.replace(/[^\d\.]/g, '')
}
