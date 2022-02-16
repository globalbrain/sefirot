import { mount } from '@vue/test-utils'
import SLink from 'sefirot/components/SLink.vue'

describe('components/SLink', () => {
  it('creates `span` tag when no link is passed', () => {
    const wrapper = mount(SLink)

    expect(wrapper.find('span').exists()).toBe(true)
  })

  it('creates `router-link` tag when link is internal', () => {
    const wrapper = mount(SLink, {
      props: {
        href: 'about'
      }
    })

    expect(wrapper.find('router-link').exists()).toBe(true)
  })

  it('creates `a` tag when link is external', () => {
    const wrapper = mount(SLink, {
      props: {
        href: 'https://google.com'
      }
    })

    expect(wrapper.find('a').exists()).toBe(true)
  })
})
