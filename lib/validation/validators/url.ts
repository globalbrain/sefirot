import { isString } from '../../support/Utils'

const regExp = /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u00A1-\uFFFF][a-z0-9\u00A1-\uFFFF_-]{0,62})?[a-z0-9\u00A1-\uFFFF]\.)+(?:[a-z\u00A1-\uFFFF]{2,}\.?))(?::\d{2,5})?(?:[/?#]\S*)?$/i

export function url(value: unknown): boolean {
  if (!isString(value)) { return false }

  return regExp.test(value)
}
