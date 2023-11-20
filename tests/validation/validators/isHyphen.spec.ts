import { isHyphen } from 'sefirot/validation/validators'

describe('validation/validators/isHyphen', () => {
  it('should validates if the value is true', () => {
    expect(isHyphen('-')).toBe(true)
    expect(isHyphen('')).toBe(false)
  })
})
