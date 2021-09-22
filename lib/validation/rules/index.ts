import { isString } from '../../support/Util'
import day from './day'
import every from './every'
import email from './email'
import include from './include'
import includeSome from './includeSome'
import integer from './integer'
import maxLength from './maxLength'
import maxValue from './maxValue'
import minValue from './minValue'
import month from './month'
import not from './not'
import regex from './regex'
import required from './required'
import requiredIf from './requiredIf'
import requiredMonthDate from './requiredMonthDate'
import requiredYearMonth from './requiredYearMonth'
import requiredYearMonthDate from './requiredYearMonthDate'
import rule from './rule'
import sameAs from './sameAs'
import url from './url'
import validateIf from './validateIf'
import year from './year'
import yearMonth from './yearMonth'
import yearMonthDate from './yearMonthDate'

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
  every,
  email,
  include,
  includeSome,
  integer,
  maxLength,
  maxValue,
  minValue,
  month,
  not,
  regex,
  required,
  requiredIf,
  requiredMonthDate,
  requiredYearMonth,
  requiredYearMonthDate,
  rule,
  sameAs,
  url,
  validateIf,
  year,
  yearMonth,
  yearMonthDate
}
