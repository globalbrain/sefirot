declare global {
  namespace jest {
    interface Matchers<R> {
      toHaveEmittedWith(value: any): R
    }
  }
}

export function toHaveEmittedWith<T>(this: jest.MatcherUtils, actual: [any[]] | undefined, expected: T) {
  let pass = false
  let received = actual

  if (Array.isArray(actual)) {
    pass = this.equals(actual[0][0], expected)
    received = actual[0][0]
  }

  if (pass) {
    return {
      pass: true,
      message: () => `${this.utils.matcherHint('.not.toHaveEmittedWith')}

Expected: not ${this.utils.printExpected(expected)}
Received: ${this.utils.printReceived(received)}`
    }
  }

  return {
    pass: false,
    message: () => `${this.utils.matcherHint('.toHaveEmittedWith')}

Expected: ${this.utils.printExpected(expected)}
Received: ${this.utils.printReceived(received)}`
  }
}
