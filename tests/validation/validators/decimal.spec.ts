import { decimal } from 'sefirot/validation/validators'

describe('validation/validators/decimal', () => {
  it('accepts valid integer strings', () => {
    expect(decimal('0')).toBe(true)
    expect(decimal('123')).toBe(true)
    expect(decimal('-42')).toBe(true)
    expect(decimal('+7')).toBe(true)
  })

  it('accepts valid decimal strings', () => {
    expect(decimal('0.5')).toBe(true)
    expect(decimal('-0.5')).toBe(true)
    expect(decimal('+0.5')).toBe(true)
    expect(decimal('123.456')).toBe(true)
    expect(decimal('.25')).toBe(true)
    expect(decimal('-.25')).toBe(true)
    expect(decimal('+.25')).toBe(true)
  })

  it('accepts number types', () => {
    expect(decimal(-0)).toBe(true)
    expect(decimal(123)).toBe(true)
    expect(decimal(-42.5)).toBe(true)
  })

  it('rejects non-string/number types', () => {
    expect(decimal(true)).toBe(false)
    expect(decimal(null)).toBe(false)
    expect(decimal(undefined)).toBe(false)
    expect(decimal({})).toBe(false)
    expect(decimal([])).toBe(false)
  })

  it('rejects invalid numeric strings', () => {
    expect(decimal('abc')).toBe(false)
    expect(decimal('123a')).toBe(false)
    expect(decimal('--5')).toBe(false)
    expect(decimal('5-')).toBe(false)
  })

  it('rejects NaN/Infinity', () => {
    expect(decimal(Number.NaN)).toBe(false)
    expect(decimal(Number.POSITIVE_INFINITY)).toBe(false)
    expect(decimal(Number.NEGATIVE_INFINITY)).toBe(false)
  })

  it('rejects empty string', () => {
    expect(decimal('')).toBe(false)
  })

  it('rejects a lone signs', () => {
    expect(decimal('-')).toBe(false)
    expect(decimal('.')).toBe(false)
    expect(decimal('-.')).toBe(false)
    expect(decimal('+.')).toBe(false)
  })

  it('accepts trailing decimal point', () => {
    expect(decimal('123.')).toBe(true)
    expect(decimal('-123.')).toBe(true)
    expect(decimal('+123.')).toBe(true)
  })

  it('rejects multiple decimal points', () => {
    expect(decimal('123..')).toBe(false)
    expect(decimal('123.45.67')).toBe(false)
  })
})
