import email from './email'
import regex from './regex'
import required from './required'
import url from './url'

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
  url
}
