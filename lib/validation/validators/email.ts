// https://colinhacks.com/essays/reasonable-email-regex
const emailRE = /^(?!\.)(?!.*\.\.)([a-z0-9_'+\-\.]*)[a-z0-9_'+\-]@([a-z0-9][a-z0-9\-]*\.)+[a-z0-9\-]{2,}$/i

export function email(value: unknown): boolean {
  if (typeof value !== 'string') { return false }

  return emailRE.test(value)
}
