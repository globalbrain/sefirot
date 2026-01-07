import { requiredIf } from 'sefirot/validation/validators'

describe('validation/validators/requiredIf', () => {
  it('skips validation when condition is boolean false', async () => {
    const res = await requiredIf('', false)
    expect(res).toBe(true)
  })

  it('applies required when condition is boolean true', async () => {
    const res1 = await requiredIf('hello', true)
    const res2 = await requiredIf('', true)
    expect(res1).toBe(true)
    expect(res2).toBe(false)
  })

  it('treats non-empty string condition as true, empty string as false', async () => {
    expect(await requiredIf('', '')).toBe(true)
    expect(await requiredIf('', 'x')).toBe(false)
    expect(await requiredIf('y', 'x')).toBe(true)
  })

  it('supports sync function condition', async () => {
    const yes = () => true
    const no = () => false
    expect(await requiredIf('', yes)).toBe(false)
    expect(await requiredIf('', no)).toBe(true)
  })

  it('supports async function condition', async () => {
    const yesAsync = async () => true
    const noAsync = async () => false
    expect(await requiredIf('hi', yesAsync)).toBe(true)
    expect(await requiredIf('', noAsync)).toBe(true)
  })
})
