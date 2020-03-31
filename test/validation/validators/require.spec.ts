import { required } from 'sefirot/validation/validators'

describe('Validation - Validators - require', () => {
  test('it validates if the value is present', () => {
    const checks = [
      [undefined, false],
      [null, false],
      [true, true],
      [false, true],
      ['', false],
      ['Hello', true],
      ['0', true],
      [-1, true],
      [0, true],
      [1, true],
      [[], false],
      [[1], true],
      [{}, false],
      [{ key: 'value' }, true],
      [new Date(), true]
    ]

    checks.forEach((check) => {
      expect(required(check[0])).toBe(check[1])
    })
  })
})
