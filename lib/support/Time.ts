type Awaited<T> = T extends undefined
  ? T
  : T extends PromiseLike<infer U> ? U : T

export function sleep(ms = 500): Promise<undefined> {
  return new Promise<undefined>((resolve) => setTimeout(resolve, ms))
}

export function delay<T extends any[]>(
  iterable: T,
  ms?: number
): Promise<{ [P in keyof T]: Awaited<T[P]> }> {
  return Promise.all([...iterable, sleep(ms)]) as any
}
