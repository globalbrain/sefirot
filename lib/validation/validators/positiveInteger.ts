const regExp = /^(?:\+?(?:[1-9]+[0-9]*))$/

export function positiveInteger(value: number): boolean {
  return regExp.test(value.toString())
}
