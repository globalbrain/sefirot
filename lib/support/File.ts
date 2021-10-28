/**
 * Get extension of the given file.
 */
export function getExtension(file: File): string {
  const name = file.name

  return name.slice((name.lastIndexOf('.') - 1 >>> 0) + 2)
}
