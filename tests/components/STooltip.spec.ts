import { mount } from '@vue/test-utils'
import STooltip from 'sefirot/components/STooltip.vue'
import { setupRouter } from 'tests/Utils'

describe('components/STooltip', () => {
  setupRouter()

  test('tag is set to `span` by default', () => {
    const wrapper = mount(STooltip)

    expect(wrapper.find('.STooltip').element.tagName).toBe('SPAN')
  })

  test('it shows `text` slot content', () => {
    const wrapper = mount(STooltip, {
      slots: {
        text: 'Example text.'
      }
    })

    expect(wrapper.find('.STooltip .tip').text()).toBe('Example text.')
  })

  test('it shows `text` prop content', () => {
    const wrapper = mount(STooltip, {
      props: {
        text: 'Example text.'
      }
    })

    expect(wrapper.find('.STooltip .tip').text()).toBe('Example text.')
  })
})
