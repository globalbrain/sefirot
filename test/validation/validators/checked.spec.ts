import { checked } from 'sefirot/validation/validators'

describe('validation/validators/checked', () => {
  test('it validates if the value is true', () => {
    expect(checked(true)).toBe(true)
    expect(checked(false)).toBe(false)
  })
})
