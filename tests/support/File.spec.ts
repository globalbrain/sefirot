import { formatSize } from 'sefirot/support/File'
import { f } from '../Utils'

describe('support/File', () => {
  describe('formatSize', () => {
    it('formats 0 bytes as "0 B"', () => {
      expect(formatSize(f(0))).toBe('0 B')
    })

    it('keeps bytes under 1000 in B', () => {
      expect(formatSize(f(1))).toBe('1.00 B')
      expect(formatSize(f(999))).toBe('999.00 B')
    })

    it('rolls over at 1000 to kB', () => {
      expect(formatSize(f(1000))).toBe('1.00 kB')
      expect(formatSize(f(1530))).toBe('1.53 kB')
    })

    it('uses MB, etc. with SI (×1000) progression', () => {
      expect(formatSize(f(1_000_000))).toBe('1.00 MB')
      expect(formatSize(f(1_050_000))).toBe('1.05 MB')
    })

    it('aggregates sizes across multiple files', () => {
      const files = [f(500), f(600)]
      expect(formatSize(files)).toBe('1.10 kB')
    })

    it('rounds to two decimals', () => {
      expect(formatSize(f(1_234_567))).toBe('1.23 MB')
      expect(formatSize(f(12_345_678))).toBe('12.35 MB')
    })

    it('handles an array of many files correctly', () => {
      const files = [f(250_000), f(750_000), f(1_000_000)]
      expect(formatSize(files)).toBe('2.00 MB')
    })
  })
})
