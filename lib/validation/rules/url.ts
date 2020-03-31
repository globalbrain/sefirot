import { url as baseUrl } from '../validators'
import { Rule } from './'

export default function url (message: string): Rule {
  return {
    name: 'url',
    message,
    optional: true,
    validate: baseUrl
  }
}
