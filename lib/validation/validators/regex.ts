import required from './required'

export default function regex (value: any, regExp: RegExp): boolean {
  return !required(value) || regExp.test(value)
}
