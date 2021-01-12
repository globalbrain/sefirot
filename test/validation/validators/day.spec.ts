import { day } from 'sefirot/validation/validators'

type Check = [number, number | undefined, number | undefined, boolean]

describe('validation/validators/day', () => {
  test('it validates if the value is a valid day', () => {
    const checks: Check[] = [
      [0, undefined, undefined, false],
      [1, undefined, undefined, true],
      [31, undefined, undefined, true],
      [32, undefined, undefined, false],
      [31, undefined, 1, true],
      [29, undefined, 2, true],
      [30, undefined, 2, false],
      [31, undefined, 4, false],
      [29, 2019, 2, false],
      [29, 2020, 2, true],
      [29, 2019, undefined, true]
    ]

    checks.forEach((check) => {
      expect(day(check[0], check[1], check[2])).toBe(check[3])
    })
  })
})
