import { mimeTypes } from 'sefirot/validation/validators'

describe('validation/validators/mimeTypes', () => {
  it('returns false when value is not a File', () => {
    expect(mimeTypes(undefined, ['image/png'])).toBe(false)
    expect(mimeTypes(null, ['image/png'])).toBe(false)
    expect(mimeTypes({}, ['image/png'])).toBe(false)
    expect(mimeTypes(new Blob([]), ['image/png'])).toBe(false)
  })

  it('accepts a matching MIME type', () => {
    expect(mimeTypes(new File([], 'a.png', { type: 'image/png' }), ['image/png'])).toBe(true)
  })

  it('rejects a non-matching MIME type', () => {
    expect(mimeTypes(new File([], 'a.gif', { type: 'image/gif' }), ['image/png', 'image/webp'])).toBe(false)
  })

  it('matches a type/* wildcard against any subtype', () => {
    expect(mimeTypes(new File([], 'a.png', { type: 'image/png' }), ['image/*'])).toBe(true)
    expect(mimeTypes(new File([], 'a.svg', { type: 'image/svg+xml' }), ['image/*'])).toBe(true)
    expect(mimeTypes(new File([], 'a.mp4', { type: 'video/mp4' }), ['image/*'])).toBe(false)
  })

  it('is case-insensitive for both the file type and the patterns', () => {
    expect(mimeTypes(new File([], 'a.png', { type: 'IMAGE/PNG' }), ['image/png'])).toBe(true)
    expect(mimeTypes(new File([], 'a.png', { type: 'image/png' }), ['IMAGE/*'])).toBe(true)
  })

  it('defers to the server (returns true) when the browser reports no type', () => {
    expect(mimeTypes(new File([], 'a.png', { type: '' }), ['image/png'])).toBe(true)
  })

  it('returns false when the pattern list is empty', () => {
    expect(mimeTypes(new File([], 'a.png', { type: 'image/png' }), [])).toBe(false)
  })
})
