import { mount } from '@vue/test-utils'
import SButton from 'sefirot/components/SButton.vue'
import { assertEmitted } from 'tests/Utils'

describe('components/SButton', () => {
  test('tag is set to `button` by default', () => {
    const wrapper = mount(SButton, {
      props: {
        label: 'Button'
      }
    })

    expect(wrapper.find('.SButton').element.tagName).toBe('BUTTON')
  })

  test('tag is set to `SLink` when `href` is set', () => {
    const wrapper = mount(SButton, {
      props: {
        href: 'http://example.com'
      }
    })

    expect(wrapper.find('.SButton').classes()).toContain('SLink')
  })

  test('tag is set to given `tag` if it exists', () => {
    const wrapper = mount(SButton, {
      props: {
        tag: 'div'
      }
    })

    expect(wrapper.find('.SButton').element.tagName).toBe('DIV')
  })

  test('tag is set to given `tag` if it exists even if `href` is set', () => {
    const wrapper = mount(SButton, {
      props: {
        tag: 'div',
        href: 'http://example.com'
      }
    })

    expect(wrapper.find('.SButton').element.tagName).toBe('DIV')
  })

  test('it emits click event on click', () => {
    const wrapper = mount(SButton)

    wrapper.find('.SButton').trigger('click')

    assertEmitted(wrapper, 'click', 1, undefined)
  })

  test('it emits disabled-click event on click', () => {
    const wrapper = mount(SButton, {
      props: {
        disabled: true
      }
    })

    wrapper.find('.SButton').trigger('click')

    assertEmitted(wrapper, 'disabled-click', 1, undefined)
  })
})
