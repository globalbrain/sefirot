import { email } from 'sefirot/validation/validators'

describe('validation/validators/email', () => {
  it('accepts common valid emails', () => {
    expect(email('a@b.co')).toBe(true)
    expect(email('user.name+tag@example-domain.com')).toBe(true)
    expect(email('o\'reilly@example.com')).toBe(true)
    expect(email('USER@EXAMPLE.COM')).toBe(true)
    expect(email('under_score+plus.dot@sub.example.co.uk')).toBe(true)
  })

  it('rejects non-strings', () => {
    expect(email(undefined as any)).toBe(false)
    expect(email(null as any)).toBe(false)
    expect(email(123 as any)).toBe(false)
    expect(email({} as any)).toBe(false)
  })

  it('rejects bad local parts', () => {
    expect(email('.abc@example.com')).toBe(false)
    expect(email('abc.@example.com')).toBe(false)
    expect(email('a..b@example.com')).toBe(false)
    expect(email('a"b@example.com')).toBe(false)
  })

  it('rejects bad domains', () => {
    expect(email('a@-a.com')).toBe(false)
    expect(email('a@a-.com')).toBe(false)
    expect(email('a@a.-com')).toBe(false)
    expect(email('a@b.c')).toBe(false)
    expect(email('a@exa_mple.com')).toBe(false)
    expect(email('a@example..com')).toBe(false)
    expect(email('a@localhost')).toBe(false)
  })

  it('accepts punycode TLDs with digits', () => {
    expect(email('user@example.xn--p1ai')).toBe(true)
  })
})
