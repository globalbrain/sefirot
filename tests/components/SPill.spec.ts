import { mount } from '@vue/test-utils'
import SPill from 'sefirot/components/SPill.vue'
import { assertEmitted, assertNotEmitted } from 'tests/Utils'

describe('components/SPill', () => {
  test('tag is set to `span` by default', () => {
    const wrapper = mount(SPill)

    expect(wrapper.find('.SPill').element.tagName).toBe('SPAN')
  })

  test('tag is set to `button` when `clickable` is set', () => {
    const wrapper = mount(SPill, {
      props: {
        clickable: true
      }
    })

    expect(wrapper.find('.SPill').element.tagName).toBe('BUTTON')
  })

  test('tag is set to given `tag` if it exists', () => {
    const wrapper = mount(SPill, {
      props: {
        tag: 'div'
      }
    })

    expect(wrapper.find('.SPill').element.tagName).toBe('DIV')
  })

  test('tag is set to given `tag` if it exists even if `clickable` is set', () => {
    const wrapper = mount(SPill, {
      props: {
        tag: 'div',
        clickable: true
      }
    })

    expect(wrapper.find('.SPill').element.tagName).toBe('DIV')
  })

  test('it emits click event when `clickable` prop is set', () => {
    const wrapper = mount(SPill, {
      props: {
        clickable: true
      }
    })

    wrapper.find('.SPill').trigger('click')

    assertEmitted(wrapper, 'click', 1, undefined)
  })

  test('it does not emits click event when `clickable` prop is not set', () => {
    const wrapper = mount(SPill)

    wrapper.find('.SPill').trigger('click')

    assertNotEmitted(wrapper, 'click')
  })
})
