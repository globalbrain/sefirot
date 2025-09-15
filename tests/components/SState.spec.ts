import { mount } from '@vue/test-utils'
import SState from 'sefirot/components/SState.vue'

describe('components/SState', () => {
  it('sets tag to `span` by default', () => {
    const wrapper = mount(SState, {
      props: {
        label: 'Label'
      }
    })

    expect(wrapper.find('.SState').element.tagName).toBe('SPAN')
  })

  it('sets the HTML tag via `:as`', () => {
    const wrapper = mount(SState, {
      props: {
        as: 'div',
        label: 'Label'
      }
    })

    expect(wrapper.find('.SState').element.tagName).toBe('DIV')
  })
})
