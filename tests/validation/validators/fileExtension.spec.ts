import { fileExtension } from 'sefirot/validation/validators'

describe('vaidation/validators/fileExtension', () => {
  it('returns false when value is not a File', () => {
    expect(fileExtension(undefined, ['png'])).toBe(false)
    expect(fileExtension(null, ['png'])).toBe(false)
    expect(fileExtension({}, ['png'])).toBe(false)

    const blob = new Blob(['hello'], { type: 'text/plain' })
    expect(fileExtension(blob, ['txt'])).toBe(false)
  })

  it('accepts matching extension (lowercase)', () => {
    const f = new File(['data'], 'image.png', { type: 'image/png' })
    expect(fileExtension(f, ['png'])).toBe(true)
  })

  it('accepts jpg/jpeg variants when "jpg" is allowed', () => {
    expect(fileExtension(new File(['x'], 'photo.jpg', { type: 'image/jpeg' }), ['jpg'])).toBe(true)
    expect(fileExtension(new File(['x'], 'photo.jpeg', { type: 'image/jpeg' }), ['jpg'])).toBe(true)
    expect(fileExtension(new File(['x'], 'photo.JPG', { type: 'image/jpeg' }), ['jpg'])).toBe(true)
    expect(fileExtension(new File(['x'], 'photo.JPEG', { type: 'image/jpeg' }), ['jpg'])).toBe(true)
  })

  it('rejects non-matching extension', () => {
    const f = new File(['data'], 'vector.svg', { type: 'image/svg+xml' })
    expect(fileExtension(f, ['png', 'jpg'])).toBe(false)
  })

  it('handles multiple dots correctly', () => {
    const f = new File(['data'], 'archive.tar.gz', { type: 'application/gzip' })
    expect(fileExtension(f, ['gz'])).toBe(true)
    expect(fileExtension(f, ['tar'])).toBe(false)
  })

  it('returns false for files without an extension', () => {
    const f = new File(['data'], 'README', { type: 'text/plain' })
    expect(fileExtension(f, ['txt'])).toBe(false)
  })

  it('returns false when allowed list is empty', () => {
    const f = new File(['data'], 'image.png', { type: 'image/png' })
    expect(fileExtension(f, [])).toBe(false)
  })

  it('treats option extensions case-insensitively', () => {
    const f = new File(['data'], 'image.png', { type: 'image/png' })
    expect(fileExtension(f, ['PNG'])).toBe(true)
  })

  it('treats "jpeg" option as equivalent to "jpg"', () => {
    const f1 = new File(['x'], 'photo.jpg', { type: 'image/jpeg' })
    const f2 = new File(['x'], 'photo.jpeg', { type: 'image/jpeg' })

    expect(fileExtension(f1, ['jpeg'])).toBe(true)
    expect(fileExtension(f2, ['jpeg'])).toBe(true)
  })
})
