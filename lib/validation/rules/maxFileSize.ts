import { helpers } from '@vuelidate/validators'
import { maxFileSize as baseMaxFileSize } from '../validators/maxFileSize'

export function maxFileSize(size: string, msg?: string) {
  return helpers.withParams(
    { size },
    helpers.withMessage(
      ({ $params }) => {
        return msg ?? `The file must be smaller than ${$params.size}.`
      },
      (value: File) => {
        return !helpers.req(value) || baseMaxFileSize(value, size)
      }
    )
  )
}
