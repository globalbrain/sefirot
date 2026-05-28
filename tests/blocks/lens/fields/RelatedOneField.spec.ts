import { type FieldContext } from 'sefirot/blocks/lens/FieldContext'
import { type RelatedOneFieldData } from 'sefirot/blocks/lens/FieldData'
import { type ResourceFetcher } from 'sefirot/blocks/lens/ResourceFetcher'
import { RelatedOneField } from 'sefirot/blocks/lens/fields/RelatedOneField'

function ctx(lang: 'en' | 'ja' = 'en'): FieldContext {
  return { lang }
}

function makeFetcher(response: any): ResourceFetcher {
  return (async () => response) as unknown as ResourceFetcher
}

function make(
  overrides: Partial<RelatedOneFieldData> = {},
  fetcher: ResourceFetcher = makeFetcher([])
): RelatedOneField {
  const data: RelatedOneFieldData = {
    type: 'related_one',
    key: 'country',
    labelEn: 'Country',
    labelJa: '国',
    filterKey: 'id',
    sortable: false,
    freeze: false,
    width: 0,
    required: false,
    rules: [],
    title: 'name',
    resourceEndpointMethod: 'get',
    resourceEndpointPath: '/api/countries',
    resourceEndpointDataKey: null,
    resourceTitle: 'name',
    ...overrides
  }
  return new RelatedOneField(ctx(), data, fetcher)
}

describe('blocks/lens/fields/RelatedOneField', () => {
  describe('tableCell', () => {
    it('renders the title property of the row value', () => {
      const cell = make().tableCell({ id: 1, name: 'Japan' }, {}) as any
      expect(cell.type).toBe('text')
      expect(cell.value).toBe('Japan')
    })

    it('honors a custom title key', () => {
      const cell = make({ title: 'shortName' }).tableCell(
        { id: 1, shortName: 'JP', name: 'Japan' },
        {}
      ) as any
      expect(cell.value).toBe('JP')
    })

    it('keeps null / undefined as null', () => {
      expect((make().tableCell(null, {}) as any).value).toBeNull()
      expect((make().tableCell(undefined, {}) as any).value).toBeNull()
    })

    it('renders null when the title property is missing on the row value', () => {
      const cell = make().tableCell({ id: 1 }, {}) as any
      expect(cell.value).toBeNull()
    })
  })

  describe('availableFilters', () => {
    it('exposes "=", "!=", and "in" operators when an endpoint is configured', () => {
      const filters = make().availableFilters()
      expect(Object.keys(filters).sort()).toEqual(['!=', '=', 'in'])
    })

    it('returns no filters when the resource endpoint is empty', () => {
      const filters = make({ resourceEndpointPath: '' }).availableFilters()
      expect(filters).toEqual({})
    })
  })

  describe('tableFilterMenu', () => {
    it('returns null when no endpoint is configured', async () => {
      const menu = await make({ resourceEndpointPath: '' }).tableFilterMenu([], () => {})
      expect(menu).toBeNull()
    })

    it('builds options from the fetched resource list', async () => {
      const fetcher = makeFetcher([
        { id: 1, name: 'Japan' },
        { id: 2, name: 'USA' }
      ])
      const menu = (await make({}, fetcher).tableFilterMenu([], () => {})) as any
      expect(menu.type).toBe('filter')
      expect(menu.search).toBe(true)
      expect(menu.options).toEqual([
        { label: 'Japan', value: 1 },
        { label: 'USA', value: 2 }
      ])
    })

    it('unwraps the response via resourceEndpointDataKey when set', async () => {
      const fetcher = makeFetcher({
        data: [{ id: 9, name: 'Korea' }]
      })
      const menu = (await make(
        { resourceEndpointDataKey: 'data' },
        fetcher
      ).tableFilterMenu([], () => {})) as any
      expect(menu.options).toEqual([{ label: 'Korea', value: 9 }])
    })

    it('toggles the selection via xor on click', async () => {
      const captured: any[] = []
      const onFilterUpdated = (f: any) => { captured.push(f) }
      const fetcher = makeFetcher([
        { id: 1, name: 'Japan' },
        { id: 2, name: 'USA' }
      ])
      const filters = [['country', 'in', [1]]]
      const menu = (await make({}, fetcher).tableFilterMenu(filters, onFilterUpdated)) as any
      menu.onClick(1) // remove
      expect(captured[0]).toEqual(['country', 'in', []])
      menu.onClick(2) // add
      expect(captured[1]).toEqual(['country', 'in', [1, 2]])
    })
  })
})
