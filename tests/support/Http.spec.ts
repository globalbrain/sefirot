import { objectToFormData } from 'sefirot/support/Http'

describe('support/Http', () => {
  describe('objectToFormData', () => {
    it('converts flat object to form data', () => {
      const fd = objectToFormData({ name: 'John', age: '30' })
      expect(fd.get('name')).toBe('John')
      expect(fd.get('age')).toBe('30')
    })

    it('converts null values to empty strings', () => {
      const fd = objectToFormData({ name: null })
      expect(fd.get('name')).toBe('')
    })

    it('skips undefined values', () => {
      const fd = objectToFormData({ name: 'John', age: undefined })
      expect(fd.get('name')).toBe('John')
      expect(fd.has('age')).toBe(false)
    })

    it('converts nested objects with correct keys', () => {
      const fd = objectToFormData({ address: { city: 'Tokyo', zip: '100' } })
      expect(fd.get('address[city]')).toBe('Tokyo')
      expect(fd.get('address[zip]')).toBe('100')
    })

    it('converts arrays with correct keys', () => {
      const fd = objectToFormData({ tags: ['a', 'b'] })
      expect(fd.get('tags[0]')).toBe('a')
      expect(fd.get('tags[1]')).toBe('b')
    })

    it('converts nested arrays of objects with correct keys', () => {
      const fd = objectToFormData({
        socialLinks: [
          { type: 'website', url: 'https://example.com' },
          { type: 'twitter', url: 'https://twitter.com/test' }
        ]
      })
      expect(fd.get('socialLinks[0][type]')).toBe('website')
      expect(fd.get('socialLinks[0][url]')).toBe('https://example.com')
      expect(fd.get('socialLinks[1][type]')).toBe('twitter')
      expect(fd.get('socialLinks[1][url]')).toBe('https://twitter.com/test')
    })

    it('converts deeply nested objects with correct keys', () => {
      const fd = objectToFormData({ a: { b: { c: 'deep' } } })
      expect(fd.get('a[b][c]')).toBe('deep')
    })

    it('handles Blob values', () => {
      const blob = new Blob(['content'], { type: 'text/plain' })
      const fd = objectToFormData({ file: blob })
      expect(fd.get('file')).toBeInstanceOf(Blob)
    })

    it('only includes Blob values when onlyFiles is true', () => {
      const blob = new Blob(['content'], { type: 'text/plain' })
      const fd = objectToFormData({ name: 'John', file: blob }, undefined, undefined, true)
      expect(fd.has('name')).toBe(false)
      expect(fd.get('file')).toBeInstanceOf(Blob)
    })

    it('includes nested Blobs when onlyFiles is true', () => {
      const blob = new Blob(['content'], { type: 'text/plain' })
      const fd = objectToFormData({ data: { file: blob, name: 'test' } }, undefined, undefined, true)
      expect(fd.has('data[name]')).toBe(false)
      expect(fd.get('data[file]')).toBeInstanceOf(Blob)
    })
  })
})
