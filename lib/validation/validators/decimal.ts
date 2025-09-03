export function decimal(value: unknown): boolean {
  const num = Number(value)
  return (
    !Number.isNaN(num)
    && num >= Number.MIN_SAFE_INTEGER
    && num <= Number.MAX_SAFE_INTEGER
    && num.toString() === value?.toString().replace(/(\.\d*?)0+$/, (_, p1) => (p1 === '.' ? '' : p1))
  )
}
