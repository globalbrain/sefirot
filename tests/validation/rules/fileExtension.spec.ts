import { fileExtension } from 'sefirot/validation/rules'

describe('vaidation/rules/fileExtension', () => {
  it('should validate if the file has valid extension', () => {
    const file = new File(['foo'], 'foo.txt', { type: 'text/plain' })

    expect(fileExtension(['txt']).$validator(undefined, null, null)).toBe(true)
    expect(fileExtension(['txt']).$validator(null, null, null)).toBe(true)
    expect(fileExtension(['txt']).$validator([], null, null)).toBe(true)
    expect(fileExtension(['txt']).$validator(file, null, null)).toBe(true)
    expect(fileExtension(['txt', 'png']).$validator(file, null, null)).toBe(true)

    expect(fileExtension(['txt']).$validator(true, null, null)).toBe(false)
    expect(fileExtension(['txt']).$validator(false, null, null)).toBe(false)
    expect(fileExtension(['txt']).$validator(1, null, null)).toBe(false)
    expect(fileExtension(['txt']).$validator('abc', null, null)).toBe(false)
    expect(fileExtension(['txt']).$validator({}, null, null)).toBe(false)
    expect(fileExtension(['png']).$validator(file, null, null)).toBe(false)
  })

  it('should treat `jpg` extension with extra care', () => {
    const jpg = new File(['foo'], 'foo.jpg', { type: 'text/plain' })
    const jpeg = new File(['foo'], 'foo.jpeg', { type: 'text/plain' })
    const JPG = new File(['foo'], 'foo.JPG', { type: 'text/plain' })
    const JPEG = new File(['foo'], 'foo.JPEG', { type: 'text/plain' })

    expect(fileExtension(['jpg']).$validator(undefined, null, null)).toBe(true)
    expect(fileExtension(['jpg']).$validator(null, null, null)).toBe(true)
    expect(fileExtension(['jpg']).$validator([], null, null)).toBe(true)
    expect(fileExtension(['jpg']).$validator(jpg, null, null)).toBe(true)
    expect(fileExtension(['jpg']).$validator(jpeg, null, null)).toBe(true)
    expect(fileExtension(['jpg']).$validator(JPG, null, null)).toBe(true)
    expect(fileExtension(['jpg']).$validator(JPEG, null, null)).toBe(true)
  })

  test('default error message', () => {
    const rule = fileExtension(['txt'])
    expect(rule.$message({ $params: {} })).toBe('The file extension is invalid.')
  })

  test('custom error message', () => {
    const rule = fileExtension(['txt'], 'Custom message.')
    expect(rule.$message({ $params: {} })).toBe('Custom message.')
  })
})
