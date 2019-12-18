import require from './require'

interface Rule {
  message: string
  validate (value: any): boolean
}

function createRule (message: string, validate: (value: any) => boolean): Rule {
  return { message, validate }
}

export {
  Rule,
  createRule,
  require
}

export default {
  require
}
