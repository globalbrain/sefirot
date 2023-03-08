import { requiredHms } from 'sefirot/validation/validators'

describe('validation/validators/requiredHms', () => {
  test('validates if the hours, minutes, and seconds are present', () => {
    expect(requiredHms({ hour: null, minute: null, second: null })).toBe(false)
    expect(requiredHms({ hour: '01', minute: '02', second: '03' })).toBe(true)
    expect(requiredHms({ hour: '01', minute: '03', second: null })).toBe(false)
  })

  test('validates only given types', () => {
    const data = { hour: '01', minute: '02', second: null }

    expect(requiredHms(data, ['h', 'm'])).toBe(true)
  })
})
