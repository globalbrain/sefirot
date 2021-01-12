import { year as baseYear } from '../validators'
import { Rule } from './'

export default function year(message?: string): Rule {
  return {
    name: 'year',
    message: message ?? 'The year is invalid.',
    optional: true,
    validate: baseYear
  }
}
