export function sleep(ms = 500): Promise<undefined> {
  return new Promise<undefined>((resolve) => setTimeout(resolve, ms))
}

export function delay<T extends unknown[]>(
  iterable: [...T],
  ms?: number
): Promise<{ [P in keyof T]: Awaited<T[P]> }> {
  return Promise.all([...iterable, sleep(ms)]) as any
}
