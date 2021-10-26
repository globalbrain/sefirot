import baseRequiredHMS, { HMSType } from '../validators/requiredHMS'
import { Rule } from './'

export default function requiredHMS(required?: HMSType[], message?: string): Rule {
  return {
    name: 'requiredHMS',
    message: message ?? 'The field is required.',
    optional: true,
    validate: v => baseRequiredHMS(v, required)
  }
}
