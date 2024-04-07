import { mount } from '@vue/test-utils'
import STooltip from 'sefirot/components/STooltip.vue'
import { setupRouter } from 'tests/Utils'

describe('components/STooltip', () => {
  setupRouter()

  test('tag is set to `span` by default', () => {
    const wrapper = mount(STooltip)

    expect(wrapper.find('.STooltip').element.tagName).toBe('SPAN')
  })

  test('shows `text` slot content', () => {
    mount(STooltip, {
      slots: {
        text: 'Example text.'
      }
    })

    expect(document.body.querySelector('#sefirot-modals .tip')?.textContent).toBe('Example text.')
  })

  test('shows `text` prop content', () => {
    mount(STooltip, {
      props: {
        text: 'Example text.'
      }
    })

    expect(document.body.querySelector('#sefirot-modals .tip')?.textContent).toBe('Example text.')
  })

  test.skip('shows tooltip on hover', async () => {
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

  test.skip('shows tooltip on focus', async () => {
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
