import { mount } from '@vue/test-utils'
import SIconX from 'sefirot/components/icons/SIconX'
import SGrid from 'sefirot/components/SGrid'

describe('Components - Grids - SGrid', () => {
  test('if clickable, it emits `click` event when a user clicks the record', () => {
    const wrapper = mount(SGrid, {
      propsData: {
        columns: [{ name: 'name', label: 'NAME' }],
        records: [{ id: 1, name: 'John Doe' }],
        clickable: true
      }
    })

    wrapper.find('.SGrid .row').trigger('click')

    expect(wrapper.emitted('click')[0][0]).toEqual({ id: 1, name: 'John Doe' })
  })

  test('if not clickable, it will not emits `click` event when a user clicks the record', () => {
    const wrapper = mount(SGrid, {
      propsData: {
        columns: [{ name: 'name', label: 'NAME' }],
        records: [{ id: 1, name: 'John Doe' }],
        clickable: false
      }
    })

    wrapper.find('.SGrid .row').trigger('click')

    expect(wrapper.emitted('click')).toBe(undefined)
  })

  test('it can shows link action', () => {
    const wrapper = mount(SGrid, {
      propsData: {
        columns: [{ name: 'name', label: 'NAME' }],
        records: [{ id: 1, name: 'John Doe' }],
        actions: 'link'
      }
    })

    expect(wrapper.find('.SGrid .SGridActionLink').exists()).toBe(true)
  })

  test('it can shows single action', () => {
    const wrapper = mount(SGrid, {
      propsData: {
        columns: [{ name: 'name', label: 'NAME' }],
        records: [{ id: 1, name: 'John Doe' }],
        actions: { icon: SIconX, callback: () => {} }
      }
    })

    expect(wrapper.find('.SGrid .SGridActionSingle').exists()).toBe(true)
  })

  test('it can shows multi actions', () => {
    const wrapper = mount(SGrid, {
      propsData: {
        columns: [{ name: 'name', label: 'NAME' }],
        records: [{ id: 1, name: 'John Doe' }],
        actions: [{ name: 'Edit', icon: SIconX, callback: () => {} }]
      }
    })

    expect(wrapper.find('.SGrid .SGridActionMulti').exists()).toBe(true)
  })
})
