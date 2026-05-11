import { type FieldContext } from 'sefirot/blocks/lens/FieldContext'
import { type NumberFieldData } from 'sefirot/blocks/lens/FieldData'
import { NumberField } from 'sefirot/blocks/lens/fields/NumberField'

function ctx(lang: 'en' | 'ja' = 'en'): FieldContext {
  return { lang }
}

function make(overrides: Partial<NumberFieldData> = {}): NumberField {
  const data: NumberFieldData = {
    type: 'number',
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
    separator: false,
    abbr: null,
    fractionDigits: null,
    ...overrides
  }
  return new NumberField(ctx(), data)
}

describe('blocks/lens/fields/NumberField', () => {
  describe('tableCell', () => {
    it('renders a plain number cell when abbr is null', () => {
      const cell = make().tableCell(1234, {}) as any
      expect(cell.type).toBe('number')
      expect(cell.value).toBe(1234)
      expect(cell.align).toBe('left')
      expect(cell.separator).toBe(false)
      expect(cell.maximumFractionDigits).toBeNull()
    })

    it('passes through align / separator / fractionDigits to the cell', () => {
      const cell = make({
        align: 'right',
        separator: true,
        fractionDigits: 2
      }).tableCell(1234.5678, {}) as any
      expect(cell.type).toBe('number')
      expect(cell.value).toBe(1234.5678)
      expect(cell.align).toBe('right')
      expect(cell.separator).toBe(true)
      expect(cell.maximumFractionDigits).toBe(2)
    })

    it('coerces string values to numbers (e.g. decimal-as-string)', () => {
      const cell = make().tableCell('1234.5', {}) as any
      expect(cell.value).toBe(1234.5)
    })

    it('keeps null values null', () => {
      const cell = make().tableCell(null, {}) as any
      expect(cell.value).toBeNull()
    })

    it('switches to a text cell with en abbreviation when abbr=en', () => {
      const cell = make({ abbr: 'en', fractionDigits: 1 }).tableCell(12345, {}) as any
      expect(cell.type).toBe('text')
      expect(cell.value).toBe('12.3K')
    })

    it('switches to a text cell with ja abbreviation when abbr=ja', () => {
      const cell = make({ abbr: 'ja', fractionDigits: 1 }).tableCell(12345, {}) as any
      expect(cell.type).toBe('text')
      expect(cell.value).toBe('1.2万')
    })

    it('defaults abbr precision to 1 digit when fractionDigits is null', () => {
      const cell = make({ abbr: 'en' }).tableCell(12345, {}) as any
      expect(cell.value).toBe('12.3K')
    })
  })
})
