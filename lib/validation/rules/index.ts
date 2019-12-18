import require from './require'

interface Rule {
  name: string
  message: string
  validate (value: any, data: Record<string, any>): boolean
}

export {
  Rule,
  require
}

export default {
  require
}
