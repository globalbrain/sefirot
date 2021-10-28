import baseHMS, { HMSType } from '../validators/hms'
import { Rule } from './'

export default function hms(required?: HMSType[], message?: string): Rule {
  return {
    name: 'hms',
    message: message ?? 'The time format is invalid',
    optional: true,
    validate: v => baseHMS(v, required)
  }
}
