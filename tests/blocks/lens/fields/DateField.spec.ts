import { type FieldContext } from 'sefirot/blocks/lens/FieldContext'
import { type DateFieldData } from 'sefirot/blocks/lens/FieldData'
import { DateField } from 'sefirot/blocks/lens/fields/DateField'
import { day } from 'sefirot/support/Day'

function ctx(lang: 'en' | 'ja' = 'en'): FieldContext {
  return { lang }
}

function make(overrides: Partial<DateFieldData> = {}): DateField {
  const data: DateFieldData = {
    type: 'date',
    key: 'published_at',
    labelEn: 'Published at',
    labelJa: '公開日',
    filterKey: 'published_at',
    sortable: true,
    freeze: false,
    width: 0,
    required: false,
    rules: [],
    placeholderEn: null,
    placeholderJa: null,
    helpEn: null,
    helpJa: null,
    ...overrides
  }
  return new DateField(ctx(), data)
}

describe('blocks/lens/fields/DateField', () => {
  describe('inputEmptyValue', () => {
    it('stays null with no declared emptyValue', () => {
      // Guards the payloadToInput(undefined) drift: `day(undefined)` is *now*,
      // so a careless fallback rewrite would seed create forms with today.
      expect(make().inputEmptyValue()).toBeNull()
    })

    it('converts a wire-format date seed to the Day the input expects', () => {
      const seeded = make({ emptyValue: '2026-01-15' }).inputEmptyValue()

      expect(day('2026-01-15').isSame(seeded, 'day')).toBe(true)
    })
  })
})
