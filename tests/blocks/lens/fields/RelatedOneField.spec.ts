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

function captureFetcher(response: any) {
  const calls: Array<[string, string, any]> = []
  const fetcher = (async (method: any, url: any, body: any) => {
    calls.push([method, url, body])
    return response
  }) as unknown as ResourceFetcher
  return { fetcher, calls }
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
    image: null,
    resourceEndpointMethod: 'get',
    resourceEndpointPath: '/api/countries',
    resourceEndpointDataKey: null,
    resourceTitle: 'name',
    resourceImage: null,
    displayAs: null,
    ...overrides
  }
  return new RelatedOneField(ctx(), data, fetcher)
}

describe('blocks/lens/fields/RelatedOneField', () => {
  describe('tableCell (text mode — default)', () => {
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

    it('renders an empty string (not null) when the title is missing, so the table does not fall back to the raw object', () => {
      const cell = make().tableCell({ id: 1 }, {}) as any
      expect(cell.value).toBe('')
    })

    it('renders a text cell when displayAs is explicitly "text"', () => {
      const cell = make({ displayAs: 'text' }).tableCell({ name: 'Japan' }, {}) as any
      expect(cell.type).toBe('text')
      expect(cell.value).toBe('Japan')
    })
  })

  describe('tableCell (avatar mode)', () => {
    it('renders an avatar cell with name and image when displayAs is "avatar"', () => {
      const cell = make({
        displayAs: 'avatar',
        image: 'avatarUrl'
      }).tableCell(
        { id: 1, name: 'Alice', avatarUrl: 'https://example.com/a.png' },
        {}
      ) as any
      expect(cell.type).toBe('avatar')
      expect(cell.name).toBe('Alice')
      expect(cell.image).toBe('https://example.com/a.png')
    })

    it('emits an empty avatar cell when the row value is null', () => {
      const cell = make({ displayAs: 'avatar', image: 'avatarUrl' }).tableCell(null, {}) as any
      expect(cell.type).toBe('avatar')
      expect(cell.image).toBeNull()
      expect(cell.name).toBe('')
    })

    it('uses an empty name (not null) when the title is missing', () => {
      const cell = make({ displayAs: 'avatar', image: 'avatarUrl' }).tableCell(
        { id: 1, avatarUrl: 'https://example.com/a.png' },
        {}
      ) as any
      expect(cell.type).toBe('avatar')
      expect(cell.name).toBe('')
      expect(cell.image).toBe('https://example.com/a.png')
    })

    it('falls back to null image when the `image` data field is not set', () => {
      const cell = make({ displayAs: 'avatar' }).tableCell(
        { id: 1, name: 'Alice', avatarUrl: 'https://example.com/a.png' },
        {}
      ) as any
      expect(cell.image).toBeNull()
      expect(cell.name).toBe('Alice')
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

    it('builds text-style options from the fetched resource list by default', async () => {
      const fetcher = makeFetcher([
        { id: 1, name: 'Japan' },
        { id: 2, name: 'USA' }
      ])
      const menu = (await make({}, fetcher).tableFilterMenu([], () => {})) as any
      expect(menu.options).toEqual([
        { label: 'Japan', value: 1 },
        { label: 'USA', value: 2 }
      ])
    })

    it('builds avatar-style options when displayAs is "avatar"', async () => {
      const fetcher = makeFetcher([
        { id: 1, name: 'Alice', avatarUrl: 'https://example.com/a.png' },
        { id: 2, name: 'Bob', avatarUrl: 'https://example.com/b.png' }
      ])
      const menu = (await make(
        { displayAs: 'avatar', resourceImage: 'avatarUrl' },
        fetcher
      ).tableFilterMenu([], () => {})) as any
      expect(menu.options).toEqual([
        { type: 'avatar', label: 'Alice', image: 'https://example.com/a.png', value: 1 },
        { type: 'avatar', label: 'Bob', image: 'https://example.com/b.png', value: 2 }
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

  describe('resourceEndpointBody forwarding', () => {
    const body = { entity: 'country', select: ['id', 'name'], perPage: 1000 }

    it('forwards the configured body to the fetcher in tableFilterMenu', async () => {
      const { fetcher, calls } = captureFetcher([])
      await make(
        { resourceEndpointMethod: 'post', resourceEndpointBody: body },
        fetcher
      ).tableFilterMenu([], () => {})
      expect(calls).toHaveLength(1)
      expect(calls[0]).toEqual(['post', '/api/countries', body])
    })

    it('forwards the configured body to the fetcher in availableFilters', async () => {
      const { fetcher, calls } = captureFetcher([])
      const filters = make(
        { resourceEndpointMethod: 'post', resourceEndpointBody: body },
        fetcher
      ).availableFilters()
      await (filters['='] as any).optionsResolver()
      expect(calls).toHaveLength(1)
      expect(calls[0]).toEqual(['post', '/api/countries', body])
    })

    it('passes an undefined body through when none is configured', async () => {
      const { fetcher, calls } = captureFetcher([])
      await make({}, fetcher).tableFilterMenu([], () => {})
      expect(calls[0][2]).toBeUndefined()
    })
  })

  describe('Lens id option value unwrapping', () => {
    it('unwraps a `{ value, display }` id object to its scalar in tableFilterMenu', async () => {
      const fetcher = makeFetcher([
        { id: { value: 5, display: 'Japan' }, name: 'Japan' }
      ])
      const menu = (await make({ filterKey: 'id' }, fetcher).tableFilterMenu([], () => {})) as any
      expect(menu.options).toEqual([{ label: 'Japan', value: 5 }])
    })

    it('unwraps a `{ value, display }` id object to its scalar in availableFilters', async () => {
      const fetcher = makeFetcher([
        { id: { value: 5, display: 'Japan' }, name: 'Japan' }
      ])
      const filters = make({ filterKey: 'id' }, fetcher).availableFilters()
      const options = await (filters['='] as any).optionsResolver()
      expect(options).toEqual([{ value: 5, label: 'Japan' }])
    })

    it('passes a plain scalar option value through untouched', async () => {
      const fetcher = makeFetcher([{ id: 7, name: 'USA' }])
      const menu = (await make({ filterKey: 'id' }, fetcher).tableFilterMenu([], () => {})) as any
      expect(menu.options).toEqual([{ label: 'USA', value: 7 }])
    })
  })
})
