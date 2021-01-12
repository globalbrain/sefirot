import email from './email'
import regex from './regex'
import required from './required'
import rule from './rule'
import url from './url'
import year from './year'
import month from './month'
import day from './day'

export interface Rule {
  name: string
  message: string
  optional: boolean
  validate (value: any, data: Record<string, any>): boolean
}

export {
  email,
  regex,
  required,
  rule,
  url,
  year,
  month,
  day
}
