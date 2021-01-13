import { sameAs } from 'sefirot/validation/validators'

describe('validation/validators/sameAs', () => {
  test('it validates if the value is same as the given aother value', () => {
    const checks = [
      ['abc', 'abc', true],
      ['0', 0, false],
      [0, 0, true],
      [[1, 2, 3], [1, 2, 3], true],
      [[1, 2, 3], [1, 2], false],
      [{ id: 1 }, { id: 1 }, true],
      [{ id: 1 }, { id: 2 }, false]
    ]

    checks.forEach((check) => {
      expect(sameAs(check[0], check[1])).toBe(check[2])
    })
  })
})
