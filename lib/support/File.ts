/**
 * Get extension of the given file.
 */
export function getExtension(file: File): string {
  const name = file.name

  return name.slice((name.lastIndexOf('.') - 1 >>> 0) + 2)
}

/**
 * Formats the file size in bytes to a human-readable format. It also accepts
 * array of files and returns the total size.
 */
export function formatSize(files: File | File[]): string {
  const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB']
  files = Array.isArray(files) ? files : [files]
  let size = files.reduce((previous, file) => previous + file.size, 0)
  let index = 0
  while (size >= 1024 && index < units.length) {
    size /= 1024
    index++
  }
  return `${size.toFixed(2)}${units[index]}`
}
