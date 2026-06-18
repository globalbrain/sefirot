import { mount } from '@vue/test-utils'
import { type FieldContext } from 'sefirot/blocks/lens/FieldContext'
import { type RelatedManyFieldData } from 'sefirot/blocks/lens/FieldData'
import { type ResourceFetcher } from 'sefirot/blocks/lens/ResourceFetcher'
import { RelatedManyField } from 'sefirot/blocks/lens/fields/RelatedManyField'
import SDescAvatar from 'sefirot/components/SDescAvatar.vue'
import SDescPill from 'sefirot/components/SDescPill.vue'
import { DataListStateKey } from 'sefirot/composables/DataList'
import { computed } from 'vue'

function ctx(lang: 'en' | 'ja' = 'en'): FieldContext {
  return { lang }
}

function mountDataListItem(field: RelatedManyField, value: any) {
  return mount(field.dataListItemComponent(), {
    props: { value },
    global: {
      provide: {
        [DataListStateKey]: { labelWidth: computed(() => '100px') }
      }
    }
  })
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
  overrides: Partial<RelatedManyFieldData> = {},
  fetcher: ResourceFetcher = makeFetcher([])
): RelatedManyField {
  const data: RelatedManyFieldData = {
    type: 'related_many',
    key: 'members',
    labelEn: 'Members',
    labelJa: 'メンバー',
    filterKey: 'id',
    sortable: false,
    freeze: false,
    width: 0,
    required: false,
    rules: [],
    title: 'name',
    image: null,
    resourceEndpointMethod: 'get',
    resourceEndpointPath: '/api/members',
    resourceEndpointDataKey: null,
    resourceTitle: 'name',
    resourceImage: null,
    displayAs: null,
    ...overrides
  }
  return new RelatedManyField(ctx(), data, fetcher)
}

describe('blocks/lens/fields/RelatedManyField', () => {
  describe('tableCell (pills mode — default)', () => {
    it('renders pills with the title property of each row item', () => {
      const cell = make().tableCell(
        [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }],
        {}
      ) as any
      expect(cell.type).toBe('pills')
      expect(cell.pills).toEqual([
        { label: 'Alice', value: 1 },
        { label: 'Bob', value: 2 }
      ])
    })

    it('honors a custom title key', () => {
      const cell = make({ title: 'shortName' }).tableCell(
        [{ id: 1, shortName: 'JP' }, { id: 2, shortName: 'US' }],
        {}
      ) as any
      expect(cell.pills.map((p: any) => p.label)).toEqual(['JP', 'US'])
    })

    it('keeps null / undefined as an empty list of pills', () => {
      expect((make().tableCell(null, {}) as any).pills).toEqual([])
      expect((make().tableCell(undefined, {}) as any).pills).toEqual([])
    })

    it('renders pills when displayAs is explicitly "pills"', () => {
      const cell = make({ displayAs: 'pills' }).tableCell(
        [{ id: 1, name: 'Alice' }],
        {}
      ) as any
      expect(cell.type).toBe('pills')
    })
  })

  describe('tableCell (avatars mode)', () => {
    it('renders an avatars cell when displayAs is "avatars"', () => {
      const cell = make({
        displayAs: 'avatars',
        image: 'avatarUrl'
      }).tableCell(
        [
          { id: 1, name: 'Alice', avatarUrl: 'https://example.com/a.png' },
          { id: 2, name: 'Bob', avatarUrl: 'https://example.com/b.png' }
        ],
        {}
      ) as any
      expect(cell.type).toBe('avatars')
      expect(cell.avatars).toEqual([
        { image: 'https://example.com/a.png', name: 'Alice' },
        { image: 'https://example.com/b.png', name: 'Bob' }
      ])
      expect(cell.avatarCount).toBe(6)
      expect(cell.nameCount).toBe(0)
      expect(cell.tooltip).toBe(true)
    })

    it('falls back to null image when the `image` data field is not set', () => {
      const cell = make({ displayAs: 'avatars' }).tableCell(
        [{ id: 1, name: 'Alice', avatarUrl: 'https://example.com/a.png' }],
        {}
      ) as any
      expect(cell.avatars[0].image).toBeNull()
      expect(cell.avatars[0].name).toBe('Alice')
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
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' }
      ])
      const menu = (await make({}, fetcher).tableFilterMenu([], () => {})) as any
      expect(menu.options).toEqual([
        { label: 'Alice', value: 1 },
        { label: 'Bob', value: 2 }
      ])
    })

    it('builds avatar-style options when displayAs is "avatars"', async () => {
      const fetcher = makeFetcher([
        { id: 1, name: 'Alice', avatarUrl: 'https://example.com/a.png' },
        { id: 2, name: 'Bob', avatarUrl: 'https://example.com/b.png' }
      ])
      const menu = (await make(
        { displayAs: 'avatars', resourceImage: 'avatarUrl' },
        fetcher
      ).tableFilterMenu([], () => {})) as any
      expect(menu.options).toEqual([
        { type: 'avatar', label: 'Alice', image: 'https://example.com/a.png', value: 1 },
        { type: 'avatar', label: 'Bob', image: 'https://example.com/b.png', value: 2 }
      ])
    })
  })

  describe('resourceEndpointBody forwarding', () => {
    const body = { entity: 'topic', select: ['id', 'name'], perPage: 1000 }

    it('forwards the configured body to the fetcher in tableFilterMenu', async () => {
      const { fetcher, calls } = captureFetcher([])
      await make(
        { resourceEndpointMethod: 'post', resourceEndpointBody: body },
        fetcher
      ).tableFilterMenu([], () => {})
      expect(calls).toHaveLength(1)
      expect(calls[0]).toEqual(['post', '/api/members', body])
    })

    it('forwards the configured body to the fetcher in availableFilters', async () => {
      const { fetcher, calls } = captureFetcher([])
      const filters = make(
        { resourceEndpointMethod: 'post', resourceEndpointBody: body },
        fetcher
      ).availableFilters()
      await (filters['='] as any).optionsResolver()
      expect(calls).toHaveLength(1)
      expect(calls[0]).toEqual(['post', '/api/members', body])
    })
  })

  describe('dataListItemComponent', () => {
    it('renders one pill per item title by default', () => {
      const wrapper = mountDataListItem(make(), [
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' }
      ])
      const desc = wrapper.findComponent(SDescPill)
      expect(desc.exists()).toBe(true)
      expect(desc.props('pill')).toEqual([{ label: 'Alice' }, { label: 'Bob' }])
      wrapper.unmount()
    })

    it('renders avatars when displayAs is "avatars"', () => {
      const wrapper = mountDataListItem(
        make({ displayAs: 'avatars', image: 'avatarUrl' }),
        [{ id: 1, name: 'Alice', avatarUrl: 'https://example.com/a.png' }]
      )
      const desc = wrapper.findComponent(SDescAvatar)
      expect(desc.exists()).toBe(true)
      expect(desc.props('avatar')).toEqual([
        { avatar: 'https://example.com/a.png', name: 'Alice' }
      ])
      wrapper.unmount()
    })

    it('renders the empty placeholder for an empty list', () => {
      const wrapper = mountDataListItem(make(), [])
      expect(wrapper.findComponent(SDescPill).exists()).toBe(false)
      expect(wrapper.findComponent(SDescAvatar).exists()).toBe(false)
      wrapper.unmount()
    })
  })
})
