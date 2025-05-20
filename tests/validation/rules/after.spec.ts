import { day } from 'sefirot/support/Day'
import { after } from 'sefirot/validation/rules'

describe('validation/rules/after', () => {
  it('should validate if the date is after the specified date', () => {
    const rule = after(day('2020-01-02'))

    expect(rule.$validator(undefined, null, null)).toBe(true)
    expect(rule.$validator(null, null, null)).toBe(true)
    expect(rule.$validator([], null, null)).toBe(true)
    expect(rule.$validator(day('2020-01-03'), null, null)).toBe(true)
    expect(rule.$validator(day('2020-01-02'), null, null)).toBe(false)
    expect(rule.$validator(day('2020-01-01'), null, null)).toBe(false)
  })

  test('default error message', () => {
    const rule = after(day('2020-01-02'))
    expect(rule.$message({ $params: {} })).toBe('Date must be after 2020-01-02.')
  })

  test('custom error message', () => {
    const rule = after(day('2020-01-02'), 'Custom message.')
    expect(rule.$message({ $params: {} })).toBe('Custom message.')
  })
})
