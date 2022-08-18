import { mount } from '@vue/test-utils'
import { MockedFunction, vi } from 'vitest'
import SMarkdown from 'sefirot/components/SMarkdown.vue'
import { Router, useRouter } from 'vue-router'

describe('components/SMarkdown', () => {
  it('should render content', () => {
    const wrapper = mount(SMarkdown, {
      propsData: {
        content: '**text**'
      }
    })

    const content = wrapper.find('.SMarkdown-container > p > strong')
    expect(content.text()).toBe('text')
  })

  it('should render inline content', () => {
    const wrapper = mount(SMarkdown, {
      propsData: {
        content: '**text**',
        inline: true
      }
    })

    const content = wrapper.find('.SMarkdown-container > strong')
    expect(content.text()).toBe('text')
  })

  it('should render component tag', () => {
    const wrapper = mount(SMarkdown, {
      propsData: {
        tag: 'span',
        content: '**text**',
        inline: true
      }
    })

    const container = wrapper.find('.SMarkdown-container')
    expect(container.element.nodeName.toLowerCase()).toEqual('span')
  })

  it('should render external link', () => {
    const wrapper = mount(SMarkdown, {
      propsData: {
        content: '[Sefirot](https://sefirot.globalbrains.com)'
      }
    })

    const attrs = expect.objectContaining({
      target: '_blank',
      rel: 'noopener noreferrer'
    })
    expect(wrapper.find('.SMarkdown-container .SMarkdown-link').attributes()).toEqual(attrs)
  })

  it('should render callbacks', () => {
    const wrapper = mount(SMarkdown, {
      propsData: {
        content: '[text]({0}) [text]({1})'
      }
    })

    const links = wrapper.findAll('.SMarkdown-container .SMarkdown-link')
    expect(links[0].attributes('data-callback-id')).toBe('0')
    expect(links[1].attributes('data-callback-id')).toBe('1')
  })

  it('should dispatch event on link click', async () => {
    const push = vi.fn()
    const callback = vi.fn()

    vi.mock('vue-router', () => ({
      useRouter: vi.fn(() => ({
        push: () => {}
      }))
    }))

    ;(useRouter as MockedFunction<() => any>).mockImplementation(() => ({
      push
    }))

    const wrapper = mount(SMarkdown, {
      attachTo: document.body,
      propsData: {
        content: '[link]({0}) [link](/route)',
        callbacks: [callback]
      }
    })

    await wrapper.vm.$nextTick() // wait for render & DOM listeners

    const links = wrapper.findAll('.SMarkdown-container .SMarkdown-link')

    await links[0].trigger('click')
    expect(callback).toHaveBeenCalled()
    expect(wrapper.emitted('clicked')).toHaveLength(1)

    await links[1].trigger('click')
    expect(push).toHaveBeenCalledWith('/route')
    expect(wrapper.emitted('clicked')).toHaveLength(2)
  })
})
