import * as FileUtils from 'sefirot/support/File'

describe('support/File', () => {
  describe('getExtension', () => {
    test('get extension name from the given File object', () => {
      const file = new File([], 'example.txt')

      expect(FileUtils.getExtension(file)).toBe('txt')
    })
  })
})
