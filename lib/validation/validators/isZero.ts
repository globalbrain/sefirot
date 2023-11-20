export function isZero(value: string | number): boolean {
  const _value = typeof value === 'number'
    ? value.toString()
    : value

  return _value === '0'
}
