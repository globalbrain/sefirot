import { helpers } from '@vuelidate/validators'
import { maxTotalFileSize as baseMaxTotalFileSize } from '../validators/maxTotalFileSize'

export function maxTotalFileSize(size: string, msg?: string) {
  return helpers.withParams(
    { size },
    helpers.withMessage(
      ({ $params }) => {
        return msg ?? `The total file size must be smaller than ${$params.size}.`
      },
      (files: File[]) => {
        return !helpers.req(files) || baseMaxTotalFileSize(files, size)
      }
    )
  )
}
