import { isString } from '../../support/Utils'

// eslint-disable-next-line no-control-regex, regexp/no-obscure-range, regexp/no-dupe-characters-character-class, regexp/no-super-linear-backtracking
const regExp = /^(?:[A-z0-9!#$%&'*+/=?{|}~-]+(?:\.[A-z0-9!#$%&'*+/=?{|}~-]+)*|"[\v\f\x01-\x09\x0E-\x7F]*")@(?:(?:[a-z0-9](?:[\w-]*[a-z0-9])?\.)+[a-z0-9]{2,}(?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4]\d|[01]?\d{1,2})\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d{1,2}|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\v\f\x0E-\x1F\x21-\x5A\x53-\x7F]|\\[\x01-\x09\v\f\x0E-\x7F])+)\])$/i

export function email(value: unknown): boolean {
  if (!isString(value)) {
    return false
  }

  return regExp.test(value)
}
