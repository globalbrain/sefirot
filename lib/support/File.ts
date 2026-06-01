const units = ['B', 'kB', 'MB', 'GB'] as const

/**
 * Formats the file size in bytes to a human-readable format. It also accepts
 * array of files and returns the total size.
 */
export function formatSize(files: File | File[]): string {
  files = Array.isArray(files) ? files : [files]

  const size = files.reduce((sum, file) => sum + file.size, 0)
  if (size === 0) { return `0 ${units[0]}` }

  const i = Math.min(Math.floor(Math.log(size) / Math.log(1000)), units.length - 1)
  return `${(size / 1000 ** i).toFixed(2)} ${units[i]}`
}

export async function saveAs(blob: Blob | undefined, filename: string | undefined): Promise<void> {
  if (typeof window === 'undefined') {
    throw new TypeError('saveAs can only be used in a browser environment.')
  }

  if (!(blob instanceof Blob)) {
    throw new TypeError('The first argument must be a Blob.')
  }

  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = filename || 'download'
  anchor.rel = 'noopener'
  anchor.style.display = 'none'

  document.body.appendChild(anchor)
  anchor.click()

  setTimeout(() => {
    anchor.remove()
    URL.revokeObjectURL(url)
  }, 0)
}
