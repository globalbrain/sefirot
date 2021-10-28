import { fileExtension as baseFileExtension } from '../validators'
import { Rule } from './'

export default function hms(extensions: string[], message?: string): Rule {
  return {
    name: 'fileExtension',
    message: message ?? 'The file extension is invalid.',
    optional: true,
    validate: v => baseFileExtension(v, extensions)
  }
}
