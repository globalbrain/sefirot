import { helpers } from '@vuelidate/validators'
import { fileExtension as baseFileExtension } from '../validators/fileExtension'

export function fileExtension(extensions: string[], message?: string) {
  return helpers.withMessage(
    'The file extension is invalid.',
    (value: File) => {
      return !helpers.req(value) || baseFileExtension(value, extensions)
    }
  )
}
