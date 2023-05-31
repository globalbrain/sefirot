import { mount } from '@vue/test-utils'
import SLink from 'sefirot/components/SLink.vue'

describe('components/SLink', () => {
  test('creates `span` tag when no link is passed', () => {
    const wrapper = mount(SLink)

    expect(wrapper.find('span').exists()).toBe(true)
  })

  test('creates `router-link` tag when link is internal', () => {
    const wrapper = mount(SLink, {
      props: {
        href: 'about'
      }
    })

    expect(wrapper.find('router-link').exists()).toBe(true)
  })

  test('creates `a` tag when link is external', () => {
    const wrapper = mount(SLink, {
      props: {
        href: 'https://example.com'
      }
    })

    expect(wrapper.find('a').exists()).toBe(true)
  })

  test('creates `router-link` tag when `:external` is `false`', () => {
    const wrapper = mount(SLink, {
      props: {
        href: 'https://example.com',
        external: false
      }
    })

    expect(wrapper.find('router-link').exists()).toBe(true)
  })

  test('creates `a` tag when `:external` is `true`', () => {
    const wrapper = mount(SLink, {
      props: {
        href: 'about',
        external: true
      }
    })

    expect(wrapper.find('a').exists()).toBe(true)
  })
})
