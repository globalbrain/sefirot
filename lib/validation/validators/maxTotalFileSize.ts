export function maxTotalFileSize(value: unknown, size: string): boolean {
  // The model may mix freshly selected `File`s with `string` references to
  // already-uploaded files (see `SInputFileUpload`). Reject anything else,
  // but allow string references through — only `File`s contribute to the
  // total, since an already-uploaded file has no client-side size (the
  // server validates its real size). This means the total under-counts kept
  // files, which is accepted for now.
  if (!Array.isArray(value) || !value.every((v) => v instanceof File || typeof v === 'string')) {
    return false
  }

  const factor = /gb/i.test(size) ? 1e9 : /mb/i.test(size) ? 1e6 : /kb/i.test(size) ? 1e3 : 1
  const total = value.reduce((total, file) => total + (file instanceof File ? file.size : 0), 0)

  return total <= factor * Number.parseFloat(size.replace(/[^\d.]/g, ''))
}
