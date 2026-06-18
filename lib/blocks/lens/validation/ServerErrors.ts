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
