import { month } from 'sefirot/validation/validators'

describe('validation/validators/month', () => {
  test('it validates if the value is a valid month', () => {
    const checks: [number, boolean][] = [
      [0, false],
      [1, true],
      [12, true],
      [13, false]
    ]

    checks.forEach((check) => {
      expect(month(check[0])).toBe(check[1])
    })
  })
})
