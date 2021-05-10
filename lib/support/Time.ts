export function sleep(ms: number = 500): Promise<void> {
  return new Promise<undefined>((resolve) => {
    setTimeout(resolve, ms)
  })
}

export function delay<T extends Promise<any>>(iterable: T[], ms?: number): Promise<T[]> {
  return Promise.all([...iterable, sleep(ms)])
}
