export class PageNotFoundError extends Error {
  constructor() {
    super('Page Not Found', { cause: { statusCode: 404 } })
  }
}
