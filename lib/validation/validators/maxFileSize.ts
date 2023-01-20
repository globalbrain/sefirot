export function maxFileSize(file: File, size: string): boolean {
  const factor = /gb/i.test(size)
    ? 1e9
    : /mb/i.test(size)
      ? 1e6
      : /kb/i.test(size)
        ? 1e3
        : 1
  return file.size <= factor * +size.replace(/[^\d\.]/g, '')
}
