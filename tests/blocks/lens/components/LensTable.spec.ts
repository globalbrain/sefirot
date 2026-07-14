import { flushPromises, mount } from '@vue/test-utils'
import { type LensResult } from 'sefirot/blocks/lens/LensResult'
import LensTable from 'sefirot/blocks/lens/components/LensTable.vue'
import { FieldRegistryKey } from 'sefirot/blocks/lens/composables/FieldRegistry'

vi.stubGlobal('IntersectionObserver', vi.fn(() => ({
  disconnect: vi.fn(),
  observe: vi.fn()
})))

describe('blocks/lens/components/LensTable', () => {
  it('renders the table during initial loading and forwards loading updates', async () => {
    const wrapper = mount(LensTable, {
      props: {
        loading: true
      },
      global: {
        provide: {
          [FieldRegistryKey as symbol]: {
            resolve: vi.fn()
          }
        }
      }
    })

    expect(wrapper.find('.STable .loading').exists()).toBe(true)

    await wrapper.setProps({ loading: false })

    expect(wrapper.find('.STable .loading').exists()).toBe(false)
  })

  it('keeps loading visible until async columns finish building', async () => {
    let resolveFilterMenu!: (value: null) => void
    const filterMenu = new Promise<null>((resolve) => {
      resolveFilterMenu = resolve
    })
    const field = {
      tableColumn: vi.fn(() => ({ cell: { type: 'text' } })),
      tableSortMenu: vi.fn(() => null),
      tableFilterMenu: vi.fn(() => filterMenu)
    }
    const result = {
      query: {
        entity: 'users',
        select: ['name'],
        filters: [],
        sort: [],
        page: 1,
        perPage: 100
      },
      fields: {
        name: { key: 'name', type: 'text' }
      },
      data: [{ name: 'Alice' }],
      pagination: { total: 1, page: 1, perPage: 100 }
    } as unknown as LensResult
    const wrapper = mount(LensTable, {
      props: {
        loading: true
      },
      global: {
        provide: {
          [FieldRegistryKey as symbol]: {
            resolve: vi.fn(() => () => field)
          }
        }
      }
    })

    await wrapper.setProps({ loading: false, result })

    expect(wrapper.find('.STable .loading').exists()).toBe(true)

    resolveFilterMenu(null)
    await flushPromises()

    expect(wrapper.find('.STable .loading').exists()).toBe(false)
    expect(wrapper.find('.STableCellText').text()).toBe('Alice')
  })
})
