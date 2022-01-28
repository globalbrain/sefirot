import { hms } from 'sefirot/validation/validators/hms'

describe('validation/validators/hms', () => {
  it('should validate if the hours, minutes, and seconds is valid value', () => {
    expect(hms({ hour: '1', minute: '2', second: '3' })).toBe(true)
    expect(hms({ hour: '1', minute: '2' })).toBe(true)
    expect(hms({ hour: '1', second: '3' })).toBe(true)

    expect(hms({ hour: '24', minute: '59', second: '59' })).toBe(false)
    expect(hms({ hour: '23', minute: '60', second: '59' })).toBe(false)
    expect(hms({ hour: '23', minute: '59', second: '60' })).toBe(false)
  })

  it('should validate only the given types', () => {
    expect(hms({ hour: '23', minute: '59', second: '60' }, ['h', 'm'])).toBe(true)
    expect(hms({ hour: '23', minute: '60', second: '60' }, ['h', 'm'])).toBe(false)
  })
})
