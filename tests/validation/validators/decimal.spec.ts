import { decimal } from 'sefirot/validation/validators'

describe('validation/validators/decimal', () => {
  it('accepts valid integer strings', () => {
    expect(decimal('0')).toBe(true)
    expect(decimal('123')).toBe(true)
    expect(decimal('-42')).toBe(true)
  })

  it('accepts valid decimal strings', () => {
    expect(decimal('0.5')).toBe(true)
    expect(decimal('-0.5')).toBe(true)
    expect(decimal('123.456')).toBe(true)
  })

  it('rejects strings with plus sign', () => {
    expect(decimal('+1')).toBe(false)
    expect(decimal('+0.5')).toBe(false)
    expect(decimal('+.25')).toBe(false)
  })

  it('rejects strings without digits before decimal point', () => {
    expect(decimal('.25')).toBe(false)
    expect(decimal('-.25')).toBe(false)
    expect(decimal('+.25')).toBe(false)
  })

  it('rejects leading zeros in integer part', () => {
    expect(decimal('00')).toBe(false)
    expect(decimal('0123')).toBe(false)
    expect(decimal('-0123')).toBe(false)
    expect(decimal('+0123')).toBe(false)
  })

  it('accepts number types', () => {
    expect(decimal(-0)).toBe(true)
    expect(decimal(123)).toBe(true)
    expect(decimal(-42.5)).toBe(true)
  })

  it('rejects minus zero as string', () => {
    expect(decimal('-0')).toBe(false)
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

  it('rejects lone signs', () => {
    expect(decimal('-')).toBe(false)
    expect(decimal('.')).toBe(false)
    expect(decimal('-.')).toBe(false)
    expect(decimal('+.')).toBe(false)
  })

  it('rejects trailing decimal point', () => {
    expect(decimal('123.')).toBe(false)
    expect(decimal('-123.')).toBe(false)
    expect(decimal('+123.')).toBe(false)
  })

  it('rejects multiple decimal points', () => {
    expect(decimal('123..')).toBe(false)
    expect(decimal('123.45.67')).toBe(false)
  })

  it('rejects Infinity notations', () => {
    expect(decimal('Infinity')).toBe(false)
    expect(decimal('+Infinity')).toBe(false)
    expect(decimal('-Infinity')).toBe(false)
  })

  it('rejects exponential/scientific notation', () => {
    expect(decimal('1e3')).toBe(false)
    expect(decimal('1e-3')).toBe(false)
    expect(decimal('2E10')).toBe(false)
    expect(decimal('-3.2e+5')).toBe(false)
  })

  it('rejects hex, octal, and binary string forms', () => {
    expect(decimal('0xFF')).toBe(false)
    expect(decimal('0xff')).toBe(false)
    expect(decimal('0o10')).toBe(false)
    expect(decimal('0b11')).toBe(false)
  })

  it('rejects leading plus sign', () => {
    expect(decimal('+1')).toBe(false)
    expect(decimal('+0.5')).toBe(false)
  })

  it('rejects surrounding whitespace', () => {
    expect(decimal(' 1 ')).toBe(false)
    expect(decimal('\n0.5\t')).toBe(false)
  })

  it('rejects numeric separators', () => {
    expect(decimal('1_000')).toBe(false)
  })

  it('rejects very large/small numbers', () => {
    expect(decimal('12345678901234567890')).toBe(false)
    expect(decimal('0.000000000123456789')).toBe(false)
    expect(decimal('-0.000000000123456789')).toBe(false)

    // eslint-disable-next-line @typescript-eslint/no-loss-of-precision
    expect(decimal(12345678901234567890)).toBe(false)
    expect(decimal(12345678901234567890n)).toBe(false)
  })

  it('accepts bigint types if within safe integer range', () => {
    expect(decimal(9007199254740991n)).toBe(true)
    expect(decimal(-9007199254740991n)).toBe(true)
  })
})
