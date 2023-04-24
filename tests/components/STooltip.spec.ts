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

  test('it shows tooltip on hover', async () => {
    vi.useFakeTimers()

    const wrapper = mount(STooltip, {
      attachTo: document.body,
      props: {
        text: 'Example text.'
      }
    })

    expect(wrapper.find('.STooltip .tip').isVisible()).toBe(false)

    await wrapper.find('.STooltip').trigger('mouseenter')
    vi.advanceTimersByTime(1)
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.STooltip .tip').isVisible()).toBe(true)

    await wrapper.find('.STooltip').trigger('mouseleave')
    vi.advanceTimersByTime(1)
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.STooltip .tip').isVisible()).toBe(false)

    vi.useRealTimers()
  })

  test('it shows tooltip on focus', async () => {
    vi.useFakeTimers()

    const wrapper = mount(STooltip, {
      attachTo: document.body,
      props: {
        text: 'Example text.',
        trigger: 'focus'
      }
    })

    expect(wrapper.find('.STooltip .tip').isVisible()).toBe(false)

    await wrapper.find('.STooltip').trigger('focusin')
    vi.advanceTimersByTime(1)
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.STooltip .tip').isVisible()).toBe(true)

    await wrapper.find('.STooltip').trigger('focusout')
    vi.advanceTimersByTime(1)
    await wrapper.vm.$nextTick()
    expect(wrapper.find('.STooltip .tip').isVisible()).toBe(false)

    vi.useRealTimers()
  })
})
