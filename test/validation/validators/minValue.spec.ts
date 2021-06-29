import { minValue } from 'sefirot/validation/validators'

type Check = [number, number, boolean]

describe('validation/validators/minValue', () => {
  test('it validates if the value is min value or more', () => {
    const checks: Check[] = [
      [101, 100, true],
      [100, 100, true],
      [99, 100, false],
      [1, 0, true],
      [0, 0, true],
      [-1, 0, false],
      [-99, -100, true],
      [-100, -100, true],
      [-101, -100, false]
    ]

    checks.forEach((check) => {
      expect(minValue(check[0], check[1])).toBe(check[2])
    })
  })
})
