import required from './required'

interface Rule {
  name: string
  message: string
  validate (value: any, data: Record<string, any>): boolean
}

export {
  Rule,
  required
}
