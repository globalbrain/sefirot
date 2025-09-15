export const hostnameRE = /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)*?\.(?:xn--[a-z0-9-]{2,59}|[a-z]{2,63})\.?$/i

// https://colinhacks.com/essays/reasonable-email-regex
const emailRE = new RegExp(`^(?!\\.)(?!.+\\.\\.)[\\w'+\\-.]*[\\w'+\\-]@${hostnameRE.source.slice(1)}`, 'i')

export function email(value: unknown): boolean {
  return typeof value === 'string' && emailRE.test(value)
}
