import { getExtension } from '../../support/File'

export default function fileExtension(file: File, extensions: string[]): boolean {
  const fileExtension = getExtension(file)

  return extensions.some((extension) => {
    // If the extention option is `jpg`, we'll consider other variants such as
    // `JPG`, `jpeg`, or `JPEG` to be valid as well for the sake of simplicity.
    if (extension === 'jpg') {
      return ['jpg', 'jpeg', 'JPG', 'JPEG'].includes(fileExtension)
    }

    return fileExtension === extension
  })
}
