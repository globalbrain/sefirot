export class PageNotFoundError extends Error {
  constructor() {
    super('Page not found', { cause: { statusCode: 404 } })
  }
}
