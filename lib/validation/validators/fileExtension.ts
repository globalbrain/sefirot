import { isFile } from 'sefirot/support/Utils'
import { getExtension } from '../../support/File'

export function fileExtension(value: unknown, extensions: string[]): boolean {
  if (!isFile(value)) {
    return false
  }

  const fileExtension = getExtension(value)

  return extensions.some((extension) => {
    // If the extention option is `jpg`, we'll consider other variants such as
    // `JPG`, `jpeg`, or `JPEG` to be valid as well for the sake of simplicity.
    if (extension === 'jpg') {
      return ['jpg', 'jpeg', 'JPG', 'JPEG'].includes(fileExtension)
    }

    return fileExtension === extension
  })
}
