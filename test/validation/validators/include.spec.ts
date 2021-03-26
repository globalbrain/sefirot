import { include } from 'sefirot/validation/validators'

type Check = [any[], any | any[], boolean]

describe('validation/validators/include', () => {
  test('it validates if the value includes the given another value', () => {
    const checks: Check[] = [
      [['abc'], 'abc', true],
      [['0'], 0, false],
      [[1, 2, 3], 2, true],
      [[{ id: 1 }], { id: 1 }, true],
      [[{ id: 1 }], { id: 2 }, false],
      [[1, 2, 3], [1, 4], true],
      [[1, 2, 3], [4, 5], false]
    ]

    checks.forEach((check) => {
      expect(include(check[0], check[1])).toBe(check[2])
    })
  })
})
