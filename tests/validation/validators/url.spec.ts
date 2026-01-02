import { url } from 'sefirot/validation/validators'
import { invalidURLCandidates, validURLCandidates } from '../fixtures/url'

describe('validation/validators/url', () => {
  it('returns false for non-string types', () => {
    expect(url(null)).toBe(false)
    expect(url(undefined)).toBe(false)
    expect(url(123)).toBe(false)
    expect(url({})).toBe(false)
  })

  it('accepts http/https with a valid DNS hostname', () => {
    expect(url('http://example.com')).toBe(true)
    expect(url('https://sub.example.co.uk')).toBe(true)
    expect(url('HTTPS://EXAMPLE.COM')).toBe(true)
    expect(url('https://a-b.example.com')).toBe(true)
    expect(url('https://user:pass@example.com:8080/path?q=1#hash')).toBe(true)
  })

  it('accepts IDN domains via punycode', () => {
    expect(url('https://münich.de')).toBe(true)
    expect(url('https://例子.测试')).toBe(true)
  })

  it('accepts FQDNs with trailing dot', () => {
    expect(url('http://example.com.')).toBe(true)
    expect(url('https://sub.example.co.uk.')).toBe(true)
  })

  it('rejects protocols other than http/https', () => {
    expect(url('ftp://example.com')).toBe(false)
    expect(url('mailto:test@example.com')).toBe(false)
  })

  it('rejects malformed URLs', () => {
    expect(url('not a url')).toBe(false)
    expect(url('http//missing-colon.com')).toBe(false)
    expect(url('https://')).toBe(false)
    expect(url('//example.com')).toBe(false)
    expect(url('example.com')).toBe(false)
    expect(url('/relative/path')).toBe(false)
  })

  it('rejects bad hostnames', () => {
    expect(url('https://-example.com')).toBe(false)
    expect(url('https://example-.com')).toBe(false)
    expect(url('https://exa_mple.com')).toBe(false)
    expect(url('https://sub..example.com')).toBe(false)
    expect(url('https://example.c')).toBe(false)
    expect(url('https://toolongtld.averyveryveryveryveryveryveryveryveryveryveryveryveryverylongtld')).toBe(false)
  })

  it('rejects IP addresses and localhost', () => {
    expect(url('http://127.0.0.1')).toBe(false)
    expect(url('http://[::1]')).toBe(false)
    expect(url('http://localhost')).toBe(false)
  })

  it('accepts valid URL candidates', () => {
    for (const candidate of validURLCandidates) {
      expect(url(candidate), `should accept ${JSON.stringify(candidate)}`).toBe(true)
    }
  })

  it('rejects invalid URL candidates', () => {
    for (const candidate of invalidURLCandidates) {
      expect(url(candidate), `should reject ${JSON.stringify(candidate)}`).toBe(false)
    }
  })
})
