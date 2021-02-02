import { maxValue } from 'sefirot/validation/validators'

type Check = [number, number, boolean]

describe('validation/validators/maxValue', () => {
  test('it validates if the value is max value or less', () => {
    const checks: Check[] = [
      [255, 256, true],
      [256, 256, true],
      [256, 255, false],
      [-1, 0, true],
      [0, 0, true],
      [0, -1, false],
      [-256, -255, true],
      [-256, -256, true],
      [-255, -256, false]
    ]

    checks.forEach((check) => {
      expect(maxValue(check[0], check[1])).toBe(check[2])
    })
  })
})
