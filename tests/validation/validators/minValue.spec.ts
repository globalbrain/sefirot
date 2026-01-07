import { day } from 'sefirot/support/Day'
import { minValue } from 'sefirot/validation/validators'

describe('validation/validators/minValue', () => {
  it('accepts numbers >= min', () => {
    expect(minValue(5, 5)).toBe(true)
    expect(minValue(6, 5)).toBe(true)
  })

  it('rejects numbers < min', () => {
    expect(minValue(4, 5)).toBe(false)
  })

  it('accepts numeric strings', () => {
    expect(minValue('5', 5)).toBe(true)
    expect(minValue('6', 5)).toBe(true)
  })

  it('rejects non-numeric strings', () => {
    expect(minValue('abc', 10)).toBe(false)
    expect(minValue('123a', 200)).toBe(false)
  })

  it('rejects scientific notation', () => {
    expect(minValue('5e2', 400)).toBe(false)
  })

  it('rejects empty string', () => {
    expect(minValue('', 0)).toBe(false)
  })

  it('rejects lone minus string "-"', () => {
    expect(minValue('-', -10)).toBe(false)
  })

  it('rejects decimal point without digits', () => {
    expect(minValue('123.', 100)).toBe(false)
  })

  it('accepts Date when timestamp >= min', () => {
    const d = day('2024-01-01')
    expect(minValue(d.toDate(), +d)).toBe(true)
  })

  it('rejects Date when timestamp < min', () => {
    const d = day('2024-01-01')
    const earlier = new Date(+d - 1)
    expect(minValue(earlier, +d)).toBe(false)
  })

  it('rejects invalid Date', () => {
    const bad = new Date('invalid')
    expect(minValue(bad, Date.now())).toBe(false)
  })

  it('rejects non-decimal, non-Date types', () => {
    expect(minValue(true, 0)).toBe(false)
    expect(minValue({}, 0)).toBe(false)
    expect(minValue(null, 0)).toBe(false)
    expect(minValue(undefined, 0)).toBe(false)
  })
})
