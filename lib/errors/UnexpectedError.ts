export class UnexpectedError extends Error {
  constructor() {
    super('Unexpected error occurred', { cause: { statusCode: 500 } })
  }
}
