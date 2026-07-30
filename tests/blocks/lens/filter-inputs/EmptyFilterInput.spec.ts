import { EmptyFilterInput } from 'sefirot/blocks/lens/filter-inputs/EmptyFilterInput'

describe('blocks/lens/filter-inputs/EmptyFilterInput', () => {
  it('requires no value', () => {
    expect(new EmptyFilterInput().rules()).toEqual({})
  })

  it('casts any value to null', () => {
    const input = new EmptyFilterInput()
    expect(input.castValue(null)).toBeNull()
    expect(input.castValue('foo')).toBeNull()
    expect(input.castValue([1, 2])).toBeNull()
    expect(input.castValue(0)).toBeNull()
  })

  it('renders no value text', async () => {
    expect(await new EmptyFilterInput().valueToText('anything')).toBe('')
  })

  it('has no value component', () => {
    expect(new EmptyFilterInput().component()).toBeNull()
  })
})
