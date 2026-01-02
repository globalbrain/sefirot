import { mount } from '@vue/test-utils'
import STooltip from 'sefirot/components/STooltip.vue'
import { nextTick } from 'vue'

describe('components/STooltip', () => {
  const getTooltipContainer = () => {
    return document.body.querySelector('#sefirot-modals .container') as HTMLElement | null
  }

  const getTooltipContent = () => {
    const container = getTooltipContainer()
    return container?.querySelector('.tip')?.textContent || null
  }

  const isTooltipVisible = async () => {
    vi.runAllTimers()
    await nextTick()
    vi.runAllTimers()
    await nextTick()
    const container = getTooltipContainer()
    return !!container && getComputedStyle(container).display !== 'none'
  }

  it('sets tag to `span` by default', () => {
    const wrapper = mount(STooltip)

    expect(wrapper.find('.STooltip').element.tagName).toBe('SPAN')
  })

  it('shows `text` slot content', () => {
    mount(STooltip, {
      slots: {
        text: 'Example text.'
      }
    })

    expect(getTooltipContent()).toBe('Example text.')
  })

  it('shows `text` prop content', () => {
    mount(STooltip, {
      props: {
        text: 'Example text.'
      }
    })

    expect(getTooltipContent()).toBe('Example text.')
  })

  it('shows tooltip on hover', async () => {
    vi.useFakeTimers()

    const wrapper = mount(STooltip, {
      attachTo: document.body,
      props: {
        text: 'Example text.'
      }
    })

    expect(await isTooltipVisible()).toBe(false)

    await wrapper.find('.STooltip').trigger('mouseenter')
    expect(await isTooltipVisible()).toBe(true)

    await wrapper.find('.STooltip').trigger('mouseleave')
    expect(await isTooltipVisible()).toBe(false)

    vi.useRealTimers()
  })

  it('shows tooltip on focus', async () => {
    vi.useFakeTimers()

    const wrapper = mount(STooltip, {
      attachTo: document.body,
      props: {
        text: 'Example text.',
        trigger: 'focus'
      }
    })

    expect(await isTooltipVisible()).toBe(false)

    await wrapper.find('.STooltip').trigger('focusin')
    expect(await isTooltipVisible()).toBe(true)

    await wrapper.find('.STooltip').trigger('focusout')
    expect(await isTooltipVisible()).toBe(false)

    vi.useRealTimers()
  })
})
