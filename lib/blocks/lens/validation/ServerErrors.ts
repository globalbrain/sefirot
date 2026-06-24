import { isFetchError } from '../../../http/Http'

/**
 * Extract Laravel-style validation errors from a failed request. The backend
 * enforces rules that can't run client-side (e.g. `unique`) and rejects with a
 * 422 whose body is `{ message, errors: { <fieldKey>: string[] } }`, keyed by
 * the bare field key.
 *
 * Returns the `errors` map so a form can feed it into Vuelidate's
 * `$externalResults` and surface a fixable per-field message, or `null` when
 * the error isn't a usable 422 (so the caller can rethrow it).
 */
export function extractServerErrors(error: unknown): Record<string, string[]> | null {
  if (!isFetchError(error) || error.status !== 422) {
    return null
  }

  const errors = (error.data as any)?.errors

  if (!errors || typeof errors !== 'object') {
    return null
  }

  return errors
}

/**
 * Extract a human-readable top-level message from a failed request, when the
 * server provides one worth showing the user. Laravel includes a `message` on
 * most error responses — policy denials (`Response::deny('…')`), business-rule
 * rejections, and 422 summaries. Limited to 4xx so internal 5xx detail never
 * leaks to the UI; 5xx / network / opaque failures return `null` so the caller
 * can fall back to its own generic copy.
 */
export function extractServerMessage(error: unknown): string | null {
  if (!isFetchError(error) || error.status == null || error.status < 400 || error.status >= 500) {
    return null
  }

  const message = (error.data as any)?.message

  return typeof message === 'string' && message.trim() !== '' ? message : null
}
