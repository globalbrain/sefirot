export function maxTotalFileSize(value: unknown, size: string): boolean {
  if (!Array.isArray(value) || value.some((v) => !(v instanceof File))) { return false }

  const factor = /gb/i.test(size) ? 1e9 : /mb/i.test(size) ? 1e6 : /kb/i.test(size) ? 1e3 : 1
  const total = value.reduce((total, file) => total + file.size, 0)

  return total <= factor * Number.parseFloat(size.replace(/[^\d.]/g, ''))
}
