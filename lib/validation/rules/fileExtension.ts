import { helpers } from '@vuelidate/validators'
import { fileExtension as baseFileExtension } from '../validators/fileExtension'

export function fileExtension(extensions: string[], msg?: string) {
  return helpers.withMessage(
    () => msg ?? 'The file extension is invalid.',
    (value: File) => {
      return !helpers.req(value) || baseFileExtension(value, extensions)
    }
  )
}
