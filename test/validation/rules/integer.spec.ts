import { integer } from 'sefirot/validation/rules'

describe('validation/rules/integer', () => {
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
      const result = integer().validate(check[0], {})

      expect(result).toBe(check[1])
    })
  })

  test('it can set custom error message', () => {
    const rule = integer('Custom message')

    expect(rule.message).toBe('Custom message')
  })
})
