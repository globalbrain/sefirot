import { integer } from 'sefirot/validation/validators'

describe('validation/validators/integer', () => {
  test('it accepts positive and negative integers', () => {
    const checks: [any, boolean][] = [
      [1, true],
      [0, true],
      [-1, true],
      [0.5, false],
      [-0.5, false],
      ['abc', false]
    ]

    checks.forEach((check) => {
      expect(integer(check[0])).toBe(check[1])
    })
  })
})
