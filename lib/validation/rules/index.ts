import { isString } from '../../support/Util'
import day from './day'
import email from './email'
import include from './include'
import maxLength from './maxLength'
import maxValue from './maxValue'
import month from './month'
import not from './not'
import regex from './regex'
import required from './required'
import requiredIf from './requiredIf'
import rule from './rule'
import sameAs from './sameAs'
import url from './url'
import year from './year'

export interface Rule {
  name: string
  message: string
  optional: boolean
  validate (value: any, data: Record<string, any>): boolean
}

export type Locator = string | LocatorFunction
export type LocatorFunction = (data: Record<string, any>) => any

export function locate(data: Record<string, any>, locator: Locator): any {
  return isString(locator) ? data[locator] : locator(data)
}

export {
  day,
  email,
  include,
  maxLength,
  maxValue,
  month,
  not,
  regex,
  required,
  requiredIf,
  rule,
  sameAs,
  url,
  year
}
