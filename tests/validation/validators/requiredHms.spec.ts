import { requiredHms } from 'sefirot/validation/validators/requiredHms'

describe('validation/validators/requiredHms', () => {
  it('should validate if the hours, minutes, and seconds are present', () => {
    expect(requiredHms({ hour: '1', minute: '2', second: '3' })).toBe(true)
    expect(requiredHms({ hour: '1', second: '3' })).toBe(false)
  })

  it('should validate only given types', () => {
    const data = { hour: '1', minute: '2' }

    expect(requiredHms(data, ['h', 'm'])).toBe(true)
  })
})
