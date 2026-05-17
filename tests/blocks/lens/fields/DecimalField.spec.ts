import { type FieldContext } from 'sefirot/blocks/lens/FieldContext'
import { type DecimalFieldData } from 'sefirot/blocks/lens/FieldData'
import { DecimalField } from 'sefirot/blocks/lens/fields/DecimalField'

function ctx(lang: 'en' | 'ja' = 'en'): FieldContext {
  return { lang }
}

function make(overrides: Partial<DecimalFieldData> = {}): DecimalField {
  const data: DecimalFieldData = {
    type: 'decimal',
    key: 'amount',
    labelEn: 'Amount',
    labelJa: '金額',
    filterKey: 'amount',
    sortable: true,
    freeze: false,
    width: 0,
    required: false,
    rules: [],
    align: null,
    separator: null,
    abbr: null,
    fractionDigits: null,
    ...overrides
  }
  return new DecimalField(ctx(), data)
}

describe('blocks/lens/fields/DecimalField', () => {
  describe('tableCell', () => {
    it('renders a number cell with the string value coerced to a number', () => {
      // Decimal payloads commonly arrive as strings to preserve precision.
      const cell = make().tableCell('12345.6789', {}) as any
      expect(cell.type).toBe('number')
      expect(cell.value).toBe(12345.6789)
    })

    it('respects separator and fractionDigits formatting', () => {
      const cell = make({
        separator: true,
        fractionDigits: 2,
        align: 'right'
      }).tableCell('12345.6789', {}) as any
      expect(cell.type).toBe('number')
      expect(cell.separator).toBe(true)
      expect(cell.maximumFractionDigits).toBe(2)
      expect(cell.align).toBe('right')
    })

    it('renders an abbreviated text cell when abbr is set', () => {
      const cell = make({ abbr: 'ja', fractionDigits: 1 }).tableCell('123456789', {}) as any
      expect(cell.type).toBe('text')
      expect(cell.value).toBe('1.2億')
    })

    it('keeps null values null', () => {
      const cell = make().tableCell(null, {}) as any
      expect(cell.value).toBeNull()
    })
  })
})
