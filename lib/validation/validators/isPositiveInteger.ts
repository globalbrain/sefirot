const regExp = /^(?:\+?(?:[1-9]+[0-9]*))$/

export function isPositiveInteger(value: string | number): boolean {
  const _value = typeof value === 'number'
    ? value.toString()
    : value

  return regExp.test(_value)
}
