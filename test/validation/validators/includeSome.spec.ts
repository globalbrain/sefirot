import { includeSome } from 'sefirot/validation/validators'

type Check = [any[], any[], boolean]

describe('validation/validators/includeSome', () => {
  test('it validates if the value includes the some of given another value', () => {
    const checks: Check[] = [
      [['abc'], ['abc', 'bcd'], true],
      [['0'], [0, 2], false],
      [[1, 2, 3], [2, 3], true],
      [[1, 2, 3], [4, 5, 6], false],
      [[{ id: 1 }], [{ id: 1 }, { id: 2 }], true],
      [[{ id: 1 }], [{ id: 2 }, { id: 4 }], false]
    ]

    checks.forEach((check) => {
      expect(includeSome(check[0], check[1])).toBe(check[2])
    })
  })
})
