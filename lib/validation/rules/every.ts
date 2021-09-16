import { Rule } from './'

interface Options {
  [name: string]: Rule[]
}

export default function every(options: Options): Rule {
  return {
    name: 'each',
    message: 'Error found in items.',
    optional: true,
    validate(value: Record<string, any>[], data): boolean {
      return value.every(item => check(options, item, data))
    }
  }
}

function check(
  options: Options,
  item: Record<string, any>,
  data: any
): boolean {
  for (const key in item) {
    const rules = options[key]

    if (!rules) {
      continue
    }

    const result = rules.every(rule => rule.validate(item[key], data))

    if (!result) {
      return false
    }
  }

  return true
}
