export class AuthorizationError extends Error {
  constructor() {
    super('Authorization failed', { cause: { statusCode: 403 } })
  }
}
