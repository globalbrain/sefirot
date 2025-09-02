const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB']

/**
 * Get extension of the given file.
 */
export function getExtension(file: File): string {
  const basename = file.name.trim().toLowerCase().split(/\/|\\/).pop()!.split(/[?#]/)[0]
  const pos = basename.lastIndexOf('.')
  return basename.endsWith('~') || pos < 1 ? '' : basename.slice(pos + 1)
}

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
