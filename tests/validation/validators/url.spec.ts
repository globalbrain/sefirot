import { url } from 'sefirot/validation/validators'
import { invalidURLCandidates, validURLCandidates } from '../fixtures/url'

describe('validation/validators/url', () => {
  it.each(validURLCandidates)('should validate `%s` as valid', (urlString) => {
    expect(url(urlString)).toBe(true)
  })

  it.each([
    null,
    undefined,
    true,
    false,
    1,
    '',
    {},
    [],
    ...invalidURLCandidates
  ])('should validate `%s` as invalid', (urlString) => {
    expect(url(urlString)).toBe(false)
  })
})
