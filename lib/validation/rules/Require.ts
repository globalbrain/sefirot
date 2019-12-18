import { Rule, createRule } from './index'

export default function require (message: string): Rule {
  return createRule(message, (value: any) => {
    return value !== ''
  })
}
