import { getExtension } from '../../support/File'

export function fileExtension(value: unknown, extensions: string[]): boolean {
  if (!(value instanceof File)) { return false }

  extensions = extensions.map((ext) => ext.toLowerCase())
  const fileExtension = getExtension(value) // already lowercased

  if (fileExtension === 'jpg' || fileExtension === 'jpeg') {
    return extensions.includes('jpg') || extensions.includes('jpeg')
  }

  return extensions.includes(fileExtension)
}
