import { requiredHmsIf } from 'sefirot/validation/validators'

describe('validation/validators/requiredHmsIf', () => {
  it('skips when condition is false', async () => {
    const res = await requiredHmsIf({ hour: '12' }, false)
    expect(res).toBe(true)
  })

  it('applies hms with default required when condition is true', async () => {
    const valid = { hour: '09', minute: '05', second: '00' }
    const invalid = { hour: '25', minute: '05', second: '00' }
    expect(await requiredHmsIf(valid, true)).toBe(true)
    expect(await requiredHmsIf(invalid, true)).toBe(false)
  })

  it('respects custom required parts and rejectNull is true', async () => {
    const val1 = { hour: '23', minute: '59' }
    const val2 = { hour: '23', minute: null }
    const val3 = { hour: undefined, minute: '10' }
    expect(await requiredHmsIf(val1, true, ['h', 'm'])).toBe(true)
    expect(await requiredHmsIf(val2, true, ['h', 'm'])).toBe(false)
    expect(await requiredHmsIf(val3, true, ['h', 'm'])).toBe(false)
  })
})
