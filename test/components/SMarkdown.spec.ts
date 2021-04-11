import { shallowMount } from '@vue/test-utils'
import SMarkdown from 'sefirot/components/SMarkdown.vue'
import { CreateWrapperFn } from '../utils'

type Instance = InstanceType<typeof SMarkdown>
let createWrapper: CreateWrapperFn<Instance>

describe('components/SMarkdown', () => {
  beforeEach(() => {
    createWrapper = options => shallowMount(SMarkdown, options)
  })

  it('should render content', () => {
    const wrapper = createWrapper({
      propsData: {
        content: '**text**'
      }
    })

    const content = wrapper.find('.SMarkdown-container > p > strong')
    expect(content.text()).toBe('text')
  })

  it('should render inline content', () => {
    const wrapper = createWrapper({
      propsData: {
        content: '**text**',
        inline: true
      }
    })

    const content = wrapper.find('.SMarkdown-container > strong')
    expect(content.text()).toBe('text')
  })

  it('should render component tag', () => {
    const wrapper = createWrapper({
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
    const wrapper = createWrapper({
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
    const wrapper = createWrapper({
      propsData: {
        content: '[text]({0}) [text]({1})'
      }
    })

    const links = wrapper.findAll('.SMarkdown-container .SMarkdown-link')
    expect(links.at(0).attributes('data-callback-id')).toBe('0')
    expect(links.at(1).attributes('data-callback-id')).toBe('1')
  })
})
