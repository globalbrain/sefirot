import { mount } from '@vue/test-utils'
import SPill from 'sefirot/components/SPill.vue'
import { assertEmitted, assertNotEmitted } from 'tests/Utils'

describe('components/SPill', () => {
  it('sets tag to `span` by default', () => {
    const wrapper = mount(SPill)

    expect(wrapper.find('.SPill').element.tagName).toBe('SPAN')
  })

  it('renders a `button` when `clickable` is set', () => {
    const wrapper = mount(SPill, {
      props: {
        clickable: true
      }
    })

    expect(wrapper.find('.SPill').element.tagName).toBe('BUTTON')
  })

  it('uses the given `:as` if it exists', () => {
    const wrapper = mount(SPill, {
      props: {
        as: 'div'
      }
    })

    expect(wrapper.find('.SPill').element.tagName).toBe('DIV')
  })

  it('uses the given `:as` even when `clickable` is set', () => {
    const wrapper = mount(SPill, {
      props: {
        as: 'div',
        clickable: true
      }
    })

    expect(wrapper.find('.SPill').element.tagName).toBe('DIV')
  })

  it('emits click event when `clickable` prop is set', () => {
    const wrapper = mount(SPill, {
      props: {
        clickable: true
      }
    })

    wrapper.find('.SPill').trigger('click')

    assertEmitted(wrapper, 'click', 1, undefined)
  })

  it('does not emit click event when `clickable` prop is not set', () => {
    const wrapper = mount(SPill)

    wrapper.find('.SPill').trigger('click')

    assertNotEmitted(wrapper, 'click')
  })
})
