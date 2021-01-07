export function sleep (ms: number = 500): Promise<void> {
  return new Promise<undefined>((resolve) => {
    setTimeout(resolve, ms)
  })
}

export function delay (iterable: Promise<any>[], ms?: number): Promise<any[]> {
  return Promise.all([...iterable, sleep(ms)])
}
