const basicRegExp = /^(?:\+?(?:[1-9]+[0-9]*))$/
const edgeCaseRegExp = /^(?:\+?(?:[1-9]+[0-9]*\.0?))$/

export function positiveInteger(value: string | number): boolean {
  const _value = typeof value === 'number'
    ? value.toString()
    : edgeCaseRegExp.test(value)
      ? Number(value).toString() // convert 1.0 to 1
      : value

  return basicRegExp.test(_value)
}
