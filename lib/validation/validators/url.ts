import { hostnameREStr } from './email'

const protocolRE = /^https?:$/i
const hostnameRE = new RegExp(hostnameREStr, 'i')

export function url(value: unknown): boolean {
  if (typeof value !== 'string') { return false }
  try {
    const url = new URL(value)
    return protocolRE.test(url.protocol) && hostnameRE.test(url.hostname)
  } catch {
    return false
  }
}
