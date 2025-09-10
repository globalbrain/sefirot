export const hostnameREStr = '^((?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)(?:\\.(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?))*?)\\.((?:xn--[a-z0-9-]{2,59})|[a-z]{2,63})\\.?$'

// https://colinhacks.com/essays/reasonable-email-regex
// eslint-disable-next-line regexp/no-unused-capturing-group, regexp/no-contradiction-with-assertion, regexp/prefer-w, regexp/no-useless-escape, regexp/no-useless-non-capturing-group, regexp/no-useless-assertions
const emailRE = new RegExp(`^(?!\\.)(?!.*\\.\\.)([a-z0-9_'+\\-\\.]*)[a-z0-9_'+\\-]@${hostnameREStr.slice(1)}$`, 'i')

export function email(value: unknown): boolean {
  return typeof value === 'string' && emailRE.test(value)
}

// FIXME: fix eslint errors in the regex, and hostnameREStr is likely not being checked
