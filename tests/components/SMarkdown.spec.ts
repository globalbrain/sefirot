import { mount } from '@vue/test-utils'
import SMarkdown from 'sefirot/components/SMarkdown.vue'

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
      rel: 'noreferrer'
    })
    expect(wrapper.find('.SMarkdown-container .SMarkdown-link').attributes()).toEqual(attrs)
  })

  it('should render internal link', () => {
    const wrapper = mount(SMarkdown, {
      propsData: {
        content: '[Sefirot](/sefirot)'
      }
    })

    const attrs = wrapper.find('.SMarkdown-container .SMarkdown-link').attributes()
    expect(attrs).not.toHaveProperty('target')
  })
})
