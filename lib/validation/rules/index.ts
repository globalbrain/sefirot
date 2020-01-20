import required from './required'

export interface Rule {
  name: string
  message: string
  validate (value: any, data: Record<string, any>): boolean
}

export {
  required
}
