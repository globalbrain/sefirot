import { year } from 'sefirot/validation/validators'

describe('validation/validators/year', () => {
  test('it validates if the value is a valid year', () => {
    const checks: [number, boolean][] = [
      [0, false],
      [1, true],
      [10, true],
      [100, true],
      [2020, true],
      [-1, false]
    ]

    checks.forEach((check) => {
      expect(year(check[0])).toBe(check[1])
    })
  })
})
