import { hostnameRE } from './email'

const protocolRE = /^https?:$/i

export function url(value: unknown): boolean {
  if (typeof value !== 'string') { return false }
  try {
    const url = new URL(value)
    return protocolRE.test(url.protocol) && hostnameRE.test(url.hostname)
  } catch {
    return false
  }
}
