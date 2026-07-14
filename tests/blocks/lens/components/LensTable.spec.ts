import { mount } from '@vue/test-utils'
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
})
