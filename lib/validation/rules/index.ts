import day from './day'
import email from './email'
import include from './include'
import maxValue from './maxValue'
import month from './month'
import not from './not'
import regex from './regex'
import required from './required'
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

export {
  day,
  email,
  include,
  maxValue,
  month,
  not,
  regex,
  required,
  rule,
  sameAs,
  url,
  year
}
