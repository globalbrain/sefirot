import { mount } from '@vue/test-utils'
import SState from 'sefirot/components/SState.vue'

describe('components/SState', () => {
  test('tag is set to `span` by default', () => {
    const wrapper = mount(SState)

    expect(wrapper.find('.SState').element.tagName).toBe('SPAN')
  })

  test('`:as` sets html tag', () => {
    const wrapper = mount(SState, {
      props: {
        as: 'div'
      }
    })

    expect(wrapper.find('.SState').element.tagName).toBe('DIV')
  })
})
