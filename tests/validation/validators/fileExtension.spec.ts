import { fileExtension } from 'sefirot/validation/validators'

describe('vaidation/validators/fileExtension', () => {
  it('returns false when value is not a File', () => {
    expect(fileExtension(undefined, ['png'])).toBe(false)
    expect(fileExtension(null, ['png'])).toBe(false)
    expect(fileExtension({}, ['png'])).toBe(false)
    expect(fileExtension(new Blob([]), ['txt'])).toBe(false)
  })

  it('accepts matching extension (lowercase)', () => {
    expect(fileExtension(new File([], 'image.png'), ['png'])).toBe(true)
  })

  it('accepts jpg/jpeg variants when "jpg" is allowed', () => {
    expect(fileExtension(new File([], 'photo.jpg'), ['jpg'])).toBe(true)
    expect(fileExtension(new File([], 'photo.jpeg'), ['jpg'])).toBe(true)
    expect(fileExtension(new File([], 'photo.JPG'), ['jpg'])).toBe(true)
    expect(fileExtension(new File([], 'photo.JPEG'), ['jpg'])).toBe(true)
  })

  it('rejects non-matching extension', () => {
    expect(fileExtension(new File([], 'vector.svg'), ['png', 'jpg'])).toBe(false)
  })

  it('handles multiple dots correctly', () => {
    expect(fileExtension(new File([], 'archive.tar.gz'), ['gz'])).toBe(true)
    expect(fileExtension(new File([], 'archive.tar.gz'), ['tar'])).toBe(false)
  })

  it('returns false for files without an extension', () => {
    expect(fileExtension(new File([], 'README'), ['txt'])).toBe(false)
  })

  it('returns false when allowed list is empty', () => {
    expect(fileExtension(new File([], 'image.png'), [])).toBe(false)
  })

  it('treats option extensions case-insensitively', () => {
    expect(fileExtension(new File([], 'image.png'), ['PNG'])).toBe(true)
  })

  it('treats "jpeg" option as equivalent to "jpg"', () => {
    expect(fileExtension(new File([], 'photo.jpg'), ['jpeg'])).toBe(true)
    expect(fileExtension(new File([], 'photo.jpeg'), ['jpeg'])).toBe(true)
  })
})
