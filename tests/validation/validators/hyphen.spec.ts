import { hyphen } from 'sefirot/validation/validators'

describe('validation/validators/hyphen', () => {
  it('returns true only for the string "-"', () => {
    expect(hyphen('-')).toBe(true) // hyphen-minus
    expect(hyphen(String.fromCharCode(0x2D))).toBe(true)
  })

  it('returns false for similar strings', () => {
    expect(hyphen(' - ')).toBe(false) // with spaces
    expect(hyphen('_')).toBe(false) // underscore
    expect(hyphen('－')).toBe(false) // fullwidth hyphen-minus
    expect(hyphen('﹣')).toBe(false) // small hyphen-minus
    expect(hyphen('‐')).toBe(false) // hyphen
    expect(hyphen('‑')).toBe(false) // non-breaking hyphen
    expect(hyphen('–')).toBe(false) // en dash
    expect(hyphen('—')).toBe(false) // em dash
    expect(hyphen('―')).toBe(false) // horizontal bar
    expect(hyphen('−')).toBe(false) // minus sign
    expect(hyphen('₋')).toBe(false) // subscript minus
    expect(hyphen('⁻')).toBe(false) // superscript minus
    expect(hyphen('➖')).toBe(false) // heavy minus sign
  })

  it('returns false for non-string types', () => {
    expect(hyphen(undefined)).toBe(false)
    expect(hyphen(null)).toBe(false)
    expect(hyphen(45)).toBe(false)
    expect(hyphen(true)).toBe(false)
    expect(hyphen([])).toBe(false)
    expect(hyphen({})).toBe(false)
  })
})
