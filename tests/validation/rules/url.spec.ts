import { url } from 'sefirot/validation/rules'
import { invalidURLCandidates, validURLCandidates } from '../fixtures/url'

describe('validation/rules/ymd', () => {
  it.each([
    null,
    undefined,
    [],
    ...validURLCandidates
  ])('should validate `%s` as valid', (urlString) => {
    const rule = url()
    expect(rule.$validator(urlString, null, null)).toBe(true)
  })

  it.each([
    true,
    false,
    1,
    {},
    ...invalidURLCandidates
  ])('should validate `%s` as invalid', (urlString) => {
    const rule = url()
    expect(rule.$validator(urlString, null, null)).toBe(false)
  })

  test('default error message', () => {
    const rule = url()
    expect(rule.$message({ $params: {} })).toBe('The URL is invalid.')
  })

  test('custom error message', () => {
    const rule = url('Custom message.')
    expect(rule.$message({ $params: {} })).toBe('Custom message.')
  })
})
