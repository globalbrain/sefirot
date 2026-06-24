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
 * Auth / session-expiry statuses (Laravel: 401 unauthenticated, 419 session /
 * CSRF token expired). These need the app-level error flow — e.g. to prompt
 * re-authentication — so Lens never surfaces them inline or swallows them into a
 * snackbar; callers let them propagate to the global handler instead.
 */
const AUTH_STATUSES = new Set([401, 419])

export function isAuthError(error: unknown): boolean {
  return isFetchError(error) && error.status != null && AUTH_STATUSES.has(error.status)
}

/**
 * Extract a human-readable top-level message from a failed request, when the
 * server provides one worth showing the user. Laravel includes a `message` on
 * most error responses — policy denials (`Response::deny('…')`), business-rule
 * rejections, and 422 summaries. Limited to 4xx so internal 5xx detail never
 * leaks to the UI, and excludes auth / session statuses (see `isAuthError`) so
 * those reach the app's re-auth flow rather than being shown inline. 5xx /
 * network / opaque / auth failures return `null` so the caller can fall back to
 * its own generic copy or rethrow.
 */
export function extractServerMessage(error: unknown): string | null {
  if (
    !isFetchError(error)
    || error.status == null
    || error.status < 400
    || error.status >= 500
    || AUTH_STATUSES.has(error.status)
  ) {
    return null
  }

  const message = (error.data as any)?.message

  return typeof message === 'string' && message.trim() !== '' ? message : null
}
