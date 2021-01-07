export default function regex(value: any, regExp: RegExp): boolean {
  return regExp.test(value)
}
