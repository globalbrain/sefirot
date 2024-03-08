import { type ComputedRef, computed } from 'vue'

export type Policy<Code extends string | undefined = undefined> = ComputedRef<PolicyResponse<Code>>

export interface PolicyResponse<Code extends string | undefined = undefined> {
  ok: boolean | null
  code?: Code
  message?: string
  is(code: Code): boolean
}

export interface PolicyHelpers<Code extends string | undefined = undefined> {
  allow: (code?: Code, message?: string) => PolicyResponse<Code>
  deny: (code?: Code, message?: string) => PolicyResponse<Code>
  pending: (code?: Code, message?: string) => PolicyResponse<Code>
}

export function usePolicy<Code extends string | undefined = undefined>(
  fn: (helpers: PolicyHelpers<Code>) => PolicyResponse<Code>
): Policy<Code> {
  return computed(() => fn({
    allow: (code, message) => ({ ok: true, code, message, is: (c) => c === code }),
    deny: (code, message) => ({ ok: false, code, message, is: (c) => c === code }),
    pending: (code, message) => ({ ok: null, code, message, is: (c) => c === code })
  }))
}
