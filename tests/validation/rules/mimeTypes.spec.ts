import { mimeTypes } from 'sefirot/validation/rules'

describe('validation/rules/mimeTypes', () => {
  it('validates the file MIME type against the patterns', () => {
    const png = new File(['foo'], 'foo.png', { type: 'image/png' })
    const gif = new File(['foo'], 'foo.gif', { type: 'image/gif' })

    // optional: empty values pass.
    expect(mimeTypes(['image/png']).$validator(undefined, null, null)).toBe(true)
    expect(mimeTypes(['image/png']).$validator(null, null, null)).toBe(true)
    expect(mimeTypes(['image/png']).$validator([], null, null)).toBe(true)

    expect(mimeTypes(['image/png']).$validator(png, null, null)).toBe(true)
    expect(mimeTypes(['image/*']).$validator(gif, null, null)).toBe(true)

    expect(mimeTypes(['image/png']).$validator(gif, null, null)).toBe(false)
    expect(mimeTypes(['image/png']).$validator('abc', null, null)).toBe(false)
    expect(mimeTypes(['image/png']).$validator({}, null, null)).toBe(false)
  })

  it('shows the default error message', () => {
    const rule = mimeTypes(['image/png'])
    expect(rule.$message({ $params: {} })).toBe('The file type is invalid.')
  })

  it('uses the custom error message', () => {
    const rule = mimeTypes(['image/png'], 'Custom message.')
    expect(rule.$message({ $params: {} })).toBe('Custom message.')
  })
})
