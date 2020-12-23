import { url as baseUrl } from '../validators'
import { Rule } from './'

export default function url (message?: string): Rule {
  return {
    name: 'url',
    message: message ?? 'The URL is invalid.',
    optional: true,
    validate: baseUrl
  }
}
