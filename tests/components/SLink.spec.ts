import { mount } from '@vue/test-utils'
import SLink from 'sefirot/components/SLink.vue'
import { RouterLink } from 'vue-router'

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

    expect(wrapper.findComponent(RouterLink).exists()).toBe(true)
  })

  it('creates `a` tag without RouterLink when link is external', () => {
    const wrapper = mount(SLink, {
      props: {
        href: 'https://example.com'
      }
    })

    expect(wrapper.findComponent(RouterLink).exists()).toBe(false)
    expect(wrapper.find('a').exists()).toBe(true)
  })

  it('creates `router-link` tag when `:external` is `false`', () => {
    const wrapper = mount(SLink, {
      props: {
        href: 'https://example.com',
        external: false
      }
    })

    expect(wrapper.findComponent(RouterLink).exists()).toBe(true)
  })

  it('creates `a` tag without RouterLink when `:external` is `true`', () => {
    const wrapper = mount(SLink, {
      props: {
        href: 'about',
        external: true
      }
    })

    expect(wrapper.findComponent(RouterLink).exists()).toBe(false)
    expect(wrapper.find('a').exists()).toBe(true)
  })
})
