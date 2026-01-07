export function maxFileSize(value: unknown, size: string): boolean {
  if (!(value instanceof File)) { return false }

  const factor = /gb/i.test(size) ? 1e9 : /mb/i.test(size) ? 1e6 : /kb/i.test(size) ? 1e3 : 1

  return value.size <= factor * Number.parseFloat(size.replace(/[^\d.]/g, ''))
}
