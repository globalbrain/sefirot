export function url(value: string): boolean {
  try {
    /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
    const _ = new URL(value)
    return true
  } catch {
    return false
  }
}
