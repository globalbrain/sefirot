import { Rule } from './index'

export default function require (message: string): Rule {
  return {
    name: 'required',
    message,
    validate (value: any) {
      if (Array.isArray(value)) {
        return !!value.length
      }

      if (value === undefined || value === null) {
        return false
      }

      if (value === false) {
        return true
      }

      if (value instanceof Date) {
        // Invalid date won't pass.
        return !isNaN(value.getTime())
      }

      if (typeof value === 'object') {
        for (const _ in value) {
          return true
        }

        return false
      }

      return !!String(value).length
    }
  }
}
