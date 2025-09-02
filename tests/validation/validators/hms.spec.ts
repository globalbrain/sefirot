import { hms } from 'sefirot/validation/validators'

describe('validation/validators/hms', () => {
  it('returns false for non-object / wrong shape', () => {
    expect(hms(null)).toBe(false)
    expect(hms(undefined)).toBe(false)
    expect(hms('12:00:00')).toBe(false)
    expect(hms({ hour: 12, minute: 0, second: 0 })).toBe(false)
  })

  it('returns false when unexpected keys are present', () => {
    expect(hms({ hour: '10', minute: '15', second: '30', extra: 'field' })).toBe(false)
  })

  it('accepts valid full time', () => {
    expect(hms({ hour: '00', minute: '00', second: '00' })).toBe(true)
    expect(hms({ hour: '23', minute: '59', second: '59' })).toBe(true)
    expect(hms({ hour: '7', minute: '5', second: '9' })).toBe(true)
    expect(hms({ hour: '08', minute: '05', second: '09' })).toBe(true)
  })

  it('supports optional parts via the required arg', () => {
    expect(hms({ hour: '12', minute: '34' }, ['h', 'm'])).toBe(true)
    expect(hms({}, [])).toBe(true)
    expect(hms({ hour: '09' }, ['h'])).toBe(true)
    expect(hms({ minute: '15' }, ['m'])).toBe(true)
    expect(hms({ hour: '09' }, ['h'], true)).toBe(true)
    expect(hms({}, [], true)).toBe(true)
  })

  it('considers null valid even when the part is required ', () => {
    expect(hms({ hour: '09', minute: '30', second: null }, ['h', 'm', 's'])).toBe(true)
    expect(hms({ hour: null, minute: '00', second: '00' }, ['h', 'm', 's'])).toBe(true)
    expect(hms({ hour: '12', minute: null, second: '00' }, ['h', 'm', 's'])).toBe(true)
    expect(hms({ hour: '12', minute: '34', second: null }, ['h', 'm', 's'])).toBe(true)
  })

  it('rejects null on required parts when rejectNull is true', () => {
    expect(hms({ hour: null, minute: '00', second: '00' }, ['h', 'm', 's'], true)).toBe(false)
    expect(hms({ hour: '12', minute: null, second: '00' }, ['h', 'm', 's'], true)).toBe(false)
    expect(hms({ hour: '12', minute: '34', second: null }, ['h', 'm', 's'], true)).toBe(false)
  })

  it('rejects when required parts are missing ', () => {
    expect(hms({ hour: '09', minute: '30' }, ['h', 'm', 's'])).toBe(false)
    expect(hms({ hour: '09' }, ['h', 'm'])).toBe(false)
    expect(hms({ hour: null, minute: undefined, second: '00' }, ['h', 'm', 's'])).toBe(false)
    expect(hms({ minute: '00', second: '00' }, ['h', 'm', 's'], true)).toBe(false)
  })

  it('rejects out-of-range values', () => {
    expect(hms({ hour: '24', minute: '00', second: '00' })).toBe(false)
    expect(hms({ hour: '-1', minute: '00', second: '00' })).toBe(false)
    expect(hms({ hour: '23', minute: '60', second: '00' })).toBe(false)
    expect(hms({ hour: '23', minute: '59', second: '60' })).toBe(false)
  })

  it('rejects empty strings', () => {
    expect(hms({ hour: '', minute: '00', second: '00' })).toBe(false)
    expect(hms({ hour: '00', minute: '', second: '00' })).toBe(false)
    expect(hms({ hour: '00', minute: '00', second: '' })).toBe(false)
  })

  it('rejects whitespace strings', () => {
    expect(hms({ hour: '  ', minute: '00', second: '00' })).toBe(false)
    expect(hms({ hour: '00', minute: '  ', second: '00' })).toBe(false)
    expect(hms({ hour: '00', minute: '00', second: '  ' })).toBe(false)
  })

  it('rejects decimal/other numeric-looking strings', () => {
    expect(hms({ hour: '12.0', minute: '00', second: '00' })).toBe(false)
    expect(hms({ hour: '12', minute: '59.5', second: '00' })).toBe(false)
    expect(hms({ hour: '12', minute: '00', second: '9.9' })).toBe(false)
    expect(hms({ hour: '+1', minute: '00', second: '00' })).toBe(false)
    expect(hms({ hour: '1e1', minute: '00', second: '00' })).toBe(false)
  })

  it('rejects surrounding spaces', () => {
    expect(hms({ hour: ' 08 ', minute: ' 05 ', second: ' 00 ' })).toBe(false)
  })

  it('validates non-required fields even when not required', () => {
    expect(hms({ hour: '10', minute: '15', second: '99' }, ['h', 'm'])).toBe(false)
  })
})
