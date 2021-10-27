import { requiredHMS } from 'sefirot/validation/validators'

describe('validation/validators/requiredHMS', () => {
  test('it validates if the hours, minutes, and seconds are present', () => {
    expect(requiredHMS({ hour: '1', minute: '2', second: '3' })).toBe(true)
    expect(requiredHMS({ hour: '1', second: '3' })).toBe(false)
  })

  test('it validates only given types', () => {
    const data = { hour: '1', minute: '2' }

    expect(requiredHMS(data, ['h', 'm'])).toBe(true)
  })
})
