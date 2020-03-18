import required from './required'
import email from './email'

export interface Rule {
  name: string
  message: string
  validate (value: any, data: Record<string, any>): boolean
}

export {
  required,
  email
}
