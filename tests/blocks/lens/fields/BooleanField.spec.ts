import { type FieldContext } from 'sefirot/blocks/lens/FieldContext'
import { type BooleanFieldData } from 'sefirot/blocks/lens/FieldData'
import { BooleanField } from 'sefirot/blocks/lens/fields/BooleanField'

function ctx(lang: 'en' | 'ja' = 'en'): FieldContext {
  return { lang }
}

function make(
  overrides: Partial<BooleanFieldData> = {},
  lang: 'en' | 'ja' = 'en'
): BooleanField {
  const data: BooleanFieldData = {
    type: 'boolean',
    key: 'active',
    labelEn: 'Active',
    labelJa: 'アクティブ',
    filterKey: 'active',
    sortable: true,
    freeze: false,
    width: 0,
    required: false,
    rules: [],
    labelTrueEn: null,
    labelTrueJa: null,
    labelFalseEn: null,
    labelFalseJa: null,
    ...overrides
  }
  return new BooleanField(ctx(lang), data)
}

describe('blocks/lens/fields/BooleanField', () => {
  describe('tableCell', () => {
    it('renders the default "Yes" / "No" labels in English', () => {
      expect((make().tableCell(true, {}) as any)).toEqual({ type: 'text', value: 'Yes' })
      expect((make().tableCell(false, {}) as any)).toEqual({ type: 'text', value: 'No' })
    })

    it('renders the default 「はい」/「いいえ」 labels in Japanese', () => {
      expect((make({}, 'ja').tableCell(true, {}) as any).value).toBe('はい')
      expect((make({}, 'ja').tableCell(false, {}) as any).value).toBe('いいえ')
    })

    it('uses the configured custom labels when provided', () => {
      const field = make({
        labelTrueEn: 'Won',
        labelTrueJa: '受注',
        labelFalseEn: 'Lost',
        labelFalseJa: '失注'
      })
      expect((field.tableCell(true, {}) as any).value).toBe('Won')
      expect((field.tableCell(false, {}) as any).value).toBe('Lost')

      const fieldJa = make(
        {
          labelTrueEn: 'Won',
          labelTrueJa: '受注',
          labelFalseEn: 'Lost',
          labelFalseJa: '失注'
        },
        'ja'
      )
      expect((fieldJa.tableCell(true, {}) as any).value).toBe('受注')
      expect((fieldJa.tableCell(false, {}) as any).value).toBe('失注')
    })

    it('falls back to the default in the other language when only one custom label is set', () => {
      const field = make({ labelTrueJa: '受注' }, 'en')
      // English caller, only JA override → fall back to default "Yes".
      expect((field.tableCell(true, {}) as any).value).toBe('Yes')

      const fieldJa = make({ labelTrueEn: 'Won' }, 'ja')
      // JA caller, only EN override → fall back to default 「はい」.
      expect((fieldJa.tableCell(true, {}) as any).value).toBe('はい')
    })

    it('keeps null and undefined as null', () => {
      expect((make().tableCell(null, {}) as any).value).toBeNull()
      expect((make().tableCell(undefined, {}) as any).value).toBeNull()
    })
  })

  describe('availableFilters', () => {
    it('exposes "=" and "!=" operators', () => {
      const filters = make().availableFilters()
      expect(Object.keys(filters).sort()).toEqual(['!=', '='])
    })
  })

  describe('tableFilterMenu', () => {
    it('emits a filter dropdown with both options', async () => {
      const menu = (await make().tableFilterMenu([], () => {})) as any
      expect(menu.type).toBe('filter')
      expect(menu.search).toBe(false)
      expect(menu.options).toEqual([
        { value: true, label: 'Yes' },
        { value: false, label: 'No' }
      ])
    })

    it('passes the current selection through from the filter list', async () => {
      const filters = [['active', 'in', [true]]]
      const menu = (await make().tableFilterMenu(filters, () => {})) as any
      expect(menu.selected).toEqual([true])
    })

    it('toggles the selection via xor on click', async () => {
      const captured: any[] = []
      const onFilterUpdated = (f: any) => { captured.push(f) }

      const filters = [['active', 'in', [true]]]
      const menu = (await make().tableFilterMenu(filters, onFilterUpdated)) as any

      menu.onClick(true) // remove true
      expect(captured[0]).toEqual(['active', 'in', []])

      menu.onClick(false) // add false
      expect(captured[1]).toEqual(['active', 'in', [true, false]])
    })
  })

  describe('dataListItemComponent', () => {
    it('returns a component that the test can read via the rendered Vue node', () => {
      // The component is wrapped in `defineComponent`; we only verify
      // here that the factory is callable without throwing.
      expect(() => make().dataListItemComponent()).not.toThrow()
    })
  })
})
