import { requiredHms } from 'sefirot/validation/validators'

describe('validation/validators/requiredHms', () => {
  test('validates if the hours, minutes, and seconds are present', () => {
    expect(requiredHms({ hour: null, minute: null, second: null })).toBe(false)
    expect(requiredHms({ hour: '01', minute: '02', second: '03' })).toBe(true)
    expect(requiredHms({ hour: '01', minute: '03', second: null })).toBe(false)

    expect(requiredHms({})).toBe(false)
    expect(requiredHms({ hour: '01' })).toBe(false)
    expect(requiredHms({ hour: '01', minute: '02' })).toBe(false)
  })

  test('validates only given types', () => {
    expect(requiredHms({ hour: '01', minute: '02', second: null }, ['h', 'm'])).toBe(true)
    expect(requiredHms({ hour: '01', minute: '02' }, ['h', 'm'])).toBe(true)
  })
})
