import { shallowMount } from '@vue/test-utils'
import VueRouter from 'vue-router'
import SMarkdown from 'sefirot/components/SMarkdown.vue'
import { createVue, CreateWrapperFn } from '../utils'

let createWrapper: CreateWrapperFn<InstanceType<typeof SMarkdown>>

describe('components/SMarkdown', () => {
  beforeEach(() => {
    createWrapper = options => shallowMount(SMarkdown, options)
  })

  afterAll(() => {
    jest.restoreAllMocks()
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

  it('should dispatch event on link click', async () => {
    const { localVue } = createVue().use(VueRouter)
    const router = new VueRouter()
    const callback = jest.fn()

    const wrapper = createWrapper({
      localVue,
      router,
      attachTo: document.body,
      propsData: {
        content: '[link]({0}) [link](/route)',
        callbacks: [callback]
      }
    })

    await wrapper.vm.$nextTick() // wait for render & DOM listeners

    const links = wrapper.findAll('.SMarkdown-container .SMarkdown-link')

    await links.at(0).trigger('click')
    expect(callback).toHaveBeenCalled()
    expect(wrapper.emitted('clicked')).toHaveLength(1)

    await links.at(1).trigger('click')
    expect(router.currentRoute.path).toBe('/route')
    expect(wrapper.emitted('clicked')).toHaveLength(2)
  })

  it('should throw on invalid callback index', async () => {
    const error = jest.fn()

    jest.spyOn(global.console, 'error').mockImplementation(() => {})
    global.addEventListener('error', error)

    const wrapper = createWrapper({
      attachTo: document.body,
      propsData: {
        content: '[link]({0})',
        callbacks: []
      }
    })

    await wrapper.vm.$nextTick() // wait for render & DOM listeners

    await wrapper.find('.SMarkdown-container .SMarkdown-link').trigger('click')
    expect(error).toHaveBeenCalled()
  })
})
