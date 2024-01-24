import { fileExtension } from 'sefirot/validation/validators'

describe('vaidation/validators/fileExtension', () => {
  it('should validate if the file has valid extension', () => {
    const file = new File(['foo'], 'foo.txt', { type: 'text/plain' })

    expect(fileExtension(file, ['txt'])).toBe(true)
    expect(fileExtension(file, ['txt', 'png'])).toBe(true)

    expect(fileExtension(undefined, ['txt'])).toBe(false)
    expect(fileExtension(null, ['txt'])).toBe(false)
    expect(fileExtension(true, ['txt'])).toBe(false)
    expect(fileExtension(false, ['txt'])).toBe(false)
    expect(fileExtension(1, ['txt'])).toBe(false)
    expect(fileExtension('abc', ['txt'])).toBe(false)
    expect(fileExtension({}, ['txt'])).toBe(false)
    expect(fileExtension([], ['txt'])).toBe(false)
    expect(fileExtension(file, ['png'])).toBe(false)
  })

  it('should treat `jpg` extension with extra care', () => {
    const jpg = new File(['foo'], 'foo.jpg', { type: 'text/plain' })
    const jpeg = new File(['foo'], 'foo.jpeg', { type: 'text/plain' })
    const JPG = new File(['foo'], 'foo.JPG', { type: 'text/plain' })
    const JPEG = new File(['foo'], 'foo.JPEG', { type: 'text/plain' })

    expect(fileExtension(jpg, ['jpg'])).toBe(true)
    expect(fileExtension(jpeg, ['jpg'])).toBe(true)
    expect(fileExtension(JPG, ['jpg'])).toBe(true)
    expect(fileExtension(JPEG, ['jpg'])).toBe(true)

    expect(fileExtension(undefined, ['jpg'])).toBe(false)
    expect(fileExtension(null, ['jpg'])).toBe(false)
  })
})
