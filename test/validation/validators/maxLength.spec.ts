import { maxLength } from 'sefirot/validation/validators'

type Check = [string | Array<any>, number, boolean]

describe('validation/validators/maxLength', () => {
  test('it validates if the value is max words or less', () => {
    const checks: Check[] = [
      ['1234567890', 9, false],
      ['1234567890', 10, true],
      ['1234567890', 11, true],
      ['あいうえお', 4, false],
      ['あいうえお', 5, true],
      ['あいうえお', 6, true],
      [['a', 'b', 'c'], 2, false],
      [['a', 'b', 'c'], 3, true],
      [['a', 'b', 'c'], 4, true]
    ]

    checks.forEach((check) => {
      expect(maxLength(check[0], check[1])).toBe(check[2])
    })
  })
})
