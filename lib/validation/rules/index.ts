import required from './required'
import email from './email'
import url from './url'

export interface Rule {
  name: string
  message: string
  optional: boolean
  validate (value: any, data: Record<string, any>): boolean
}

export {
  required,
  email,
  url
}
