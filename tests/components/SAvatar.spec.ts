import { mount } from '@vue/test-utils'
import SAvatar from 'sefirot/components/SAvatar.vue'

describe('components/SAvatar', () => {
  test('it shows given image when it is present', () => {
    const wrapper = mount(SAvatar, {
      props: {
        avatar: '/example.jpg'
      }
    })

    expect(wrapper.find('.SAvatar .img').exists()).toBe(true)
  })

  test('it shows initial name if the image is not prsent', () => {
    const wrapper = mount(SAvatar, {
      props: {
        name: 'John Doe'
      }
    })

    expect(wrapper.find('.SAvatar .initial').text()).toBe('J')
  })
})
