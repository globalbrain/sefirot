import { mount } from '@vue/test-utils'
import SButton from 'sefirot/components/SButton.vue'
import { assertEmitted } from 'tests/Utils'

describe('components/SButton', () => {
  it('sets tag to `button` by default', () => {
    const wrapper = mount(SButton, {
      props: {
        label: 'Button'
      }
    })

    expect(wrapper.find('.SButton').element.tagName).toBe('BUTTON')
  })

  it('uses `SLink` when `href` is set', () => {
    const wrapper = mount(SButton, {
      props: {
        href: 'http://example.com'
      }
    })

    expect(wrapper.find('.SButton').classes()).toContain('SLink')
  })

  it('uses the given `tag` if it exists', () => {
    const wrapper = mount(SButton, {
      props: {
        tag: 'div'
      }
    })

    expect(wrapper.find('.SButton').element.tagName).toBe('DIV')
  })

  it('uses the given `tag` even when `href` is set', () => {
    const wrapper = mount(SButton, {
      props: {
        tag: 'div',
        href: 'http://example.com'
      }
    })

    expect(wrapper.find('.SButton').element.tagName).toBe('DIV')
  })

  it('emits click event on click', () => {
    const wrapper = mount(SButton)

    wrapper.find('.SButton').trigger('click')

    assertEmitted(wrapper, 'click', 1, undefined)
  })

  it('emits disabled-click event on click', () => {
    const wrapper = mount(SButton, {
      props: {
        disabled: true
      }
    })

    wrapper.find('.SButton').trigger('click')

    assertEmitted(wrapper, 'disabled-click', 1, undefined)
  })
})
