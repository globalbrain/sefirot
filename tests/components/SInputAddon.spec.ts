import { mount } from '@vue/test-utils'
import SInputAddon from 'sefirot/components/SInputAddon.vue'
import { assertEmitted, assertNotEmitted } from 'tests/Utils'

// @ts-expect-error - not properly implemented in happy-dom
delete window.MutationObserver

describe('components/SInputAddon', () => {
  test('it displays given label', () => {
    const wrapper = mount(SInputAddon, {
      props: {
        label: 'Label'
      }
    })

    expect(wrapper.find('.SInputAddon .action-label').text()).toBe('Label')
  })

  test('it focuses the button', async () => {
    const wrapper = mount(SInputAddon)

    await wrapper.find('.SInputAddon .action').trigger('focus')

    expect(wrapper.find('.SInputAddon').classes('focused')).toBe(true)
  })

  test('it blurs the button', async () => {
    const wrapper = mount(SInputAddon)

    await wrapper.find('.SInputAddon .action').trigger('focus')
    expect(wrapper.find('.SInputAddon').classes('focused')).toBe(true)

    await wrapper.find('.SInputAddon .action').trigger('blur')
    expect(wrapper.find('.SInputAddon').classes('focused')).toBe(false)
  })

  test('it emits `click` event', async () => {
    const wrapper = mount(SInputAddon)

    await wrapper.find('.SInputAddon .action').trigger('click')

    assertEmitted(wrapper, 'click', 1)
  })

  test('it renders `div` for action if it is not clickable', () => {
    const wrapper = mount(SInputAddon, {
      props: {
        clickable: false
      }
    })

    expect(wrapper.find('.SInputAddon .action').element.tagName).toBe('DIV')
  })

  test('it opens dropdown if it is defined', async () => {
    const wrapper = mount(SInputAddon, {
      props: {
        dropdown: [
          {
            type: 'filter',
            selected: null,
            options: [
              { label: 'Item 1', value: 1, onClick: () => {} },
              { label: 'Item 2', value: 2, onClick: () => {} }
            ]
          }
        ]
      }
    })

    await wrapper.find('.SInputAddon .action').trigger('click')

    expect(wrapper.find('.SInputAddon .dialog').isVisible()).toBe(true)
  })

  test('it displayes selected dropdown item if `label` is not set', async () => {
    const wrapper = mount(SInputAddon, {
      props: {
        dropdown: [
          {
            type: 'filter',
            selected: 2,
            options: [
              { label: 'Item 1', value: 1, onClick: () => {} },
              { label: 'Item 2', value: 2, onClick: () => {} }
            ]
          }
        ]
      }
    })

    expect(wrapper.find('.SInputAddon .action-label').text()).toBe('Item 2')
  })

  test('it does not emit events if it is disabled', async () => {
    const wrapper = mount(SInputAddon, {
      props: {
        disabled: true
      }
    })

    await wrapper.find('.SInputAddon .action').trigger('click')

    assertNotEmitted(wrapper, 'click')
  })
})
