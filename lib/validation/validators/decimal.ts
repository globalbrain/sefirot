const regExp = /^[-]?\d*(\.\d+)?$/

export function decimal(value: string): boolean {
  return regExp.test(value)
}
