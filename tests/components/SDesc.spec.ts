import { mount } from '@vue/test-utils'
import SDesc from 'sefirot/components/SDesc.vue'
import SDescDay from 'sefirot/components/SDescDay.vue'
import SDescItem from 'sefirot/components/SDescItem.vue'
import SDescLabel from 'sefirot/components/SDescLabel.vue'
import SDescLink from 'sefirot/components/SDescLink.vue'
import SDescNumber from 'sefirot/components/SDescNumber.vue'
import SDescPill from 'sefirot/components/SDescPill.vue'
import SDescState from 'sefirot/components/SDescState.vue'
import SDescText from 'sefirot/components/SDescText.vue'
import { day } from 'sefirot/support/Day'
import { h } from 'vue'

describe('components/SDesc', () => {
  describe('SDesc', () => {
    test('renders `SDesc` element', () => {
      const wrapper = mount(SDesc)
      expect(wrapper.find('.SDesc').exists()).toBe(true)
    })
  })

  describe('SDescItem', () => {
    test('renders `SDescItem` element', () => {
      const wrapper = mount(SDescItem)
      expect(wrapper.find('.SDescItem').exists()).toBe(true)
    })
  })

  describe('SDescLabel', () => {
    test('renders `#default`', () => {
      const wrapper = mount(SDescLabel, {
        slots: {
          default: 'Label'
        }
      })

      expect(wrapper.find('.SDescLabel .value').text()).toBe('Label')
    })

    test('renders `:value`', () => {
      const wrapper = mount(SDescLabel, {
        props: {
          value: 'Label'
        }
      })

      expect(wrapper.find('.SDescLabel .value').text()).toBe('Label')
    })
  })

  describe('SDescText', () => {
    test('renders `:value`', () => {
      const wrapper = mount(SDescText, {
        props: {
          value: 'John Doe'
        }
      })

      expect(wrapper.find('.SDescText .value').text()).toBe('John Doe')
    })

    test('renders child nodes if passed', () => {
      const wrapper = mount(SDescText, {
        slots: {
          default: h('div', [h('p', 'John Doe')])
        }
      })

      expect(wrapper.find('.SDescText .value p').text()).toBe('John Doe')
    })

    test('shows `SDescEmpty` when the #default is empty', () => {
      const wrapper = mount(SDescText, {
        slots: {
          default: h('div', '')
        }
      })

      expect(wrapper.find('.SDescText').exists()).toBe(false)
      expect(wrapper.find('.SDescEmpty').exists()).toBe(true)
    })

    test('shows `SDescEmpty` when the value is empty', () => {
      const wrapper = mount(SDescText)

      expect(wrapper.find('.SDescText').exists()).toBe(false)
      expect(wrapper.find('.SDescEmpty').exists()).toBe(true)
    })
  })

  describe('SDescNumber', () => {
    test('renders `:value`', () => {
      const wrapper = mount(SDescNumber, {
        props: {
          value: 123
        }
      })

      expect(wrapper.find('.SDescNumber .value').text()).toBe('123')
    })

    test('adds separator when `:separator` is set with `:value`', () => {
      const wrapper = mount(SDescNumber, {
        props: {
          value: 123_456,
          separator: true
        }
      })

      expect(wrapper.find('.SDescNumber .value').text()).toBe('123,456')
    })

    test('adds separator when `:separator` is set with `#default`', () => {
      const wrapper = mount(SDescNumber, {
        props: {
          separator: true
        },
        slots: {
          default: '123456'
        }
      })

      expect(wrapper.find('.SDescNumber .value').text()).toBe('123,456')
    })

    test('shows `SDescEmpty` when the #default is empty', () => {
      const wrapper = mount(SDescNumber, {
        slots: {
          default: h('div', '')
        }
      })

      expect(wrapper.find('.SDescNumber').exists()).toBe(false)
      expect(wrapper.find('.SDescEmpty').exists()).toBe(true)
    })

    test('shows `SDescEmpty` when the value is empty', () => {
      const wrapper = mount(SDescNumber)

      expect(wrapper.find('.SDescNumber').exists()).toBe(false)
      expect(wrapper.find('.SDescEmpty').exists()).toBe(true)
    })
  })

  describe('SDescLink', () => {
    test('makes `:value` a link', () => {
      const wrapper = mount(SDescLink, {
        props: {
          value: 'https://example.com'
        }
      })

      expect(wrapper.find('.SDescLink .value').text()).toBe('https://example.com')
      expect(wrapper.find('.SDescLink .value').attributes('href')).toBe('https://example.com')
    })

    test('makes `#default` a link', () => {
      const wrapper = mount(SDescLink, {
        slots: {
          default: 'https://example.com'
        }
      })

      expect(wrapper.find('.SDescLink .value').text()).toBe('https://example.com')
      expect(wrapper.find('.SDescLink .value').attributes('href')).toBe('https://example.com')
    })

    test('uses `:href` for the link when it is set', () => {
      const wrapper = mount(SDescLink, {
        props: {
          value: 'Website link',
          href: 'https://example.com'
        }
      })

      expect(wrapper.find('.SDescLink .value').text()).toBe('Website link')
      expect(wrapper.find('.SDescLink .value').attributes('href')).toBe('https://example.com')
    })

    test('shows `SDescEmpty` when the value is empty', () => {
      const wrapper = mount(SDescLink)

      expect(wrapper.find('.SDescLink').exists()).toBe(false)
      expect(wrapper.find('.SDescEmpty').exists()).toBe(true)
    })
  })

  describe('SDescDay', () => {
    test('renders `#default` as is', () => {
      const wrapper = mount(SDescDay, {
        slots: {
          default: '1985-10-10'
        }
      })

      expect(wrapper.find('.SDescDay .value').text()).toBe('1985-10-10')
    })

    test('formats `:value` with default format', () => {
      const wrapper = mount(SDescDay, {
        props: {
          value: day('1985-10-10 00:00:00')
        }
      })

      expect(wrapper.find('.SDescDay .value').text()).toBe('1985-10-10 00:00:00')
    })

    test('formats `:value` with `:format` setting', () => {
      const wrapper = mount(SDescDay, {
        props: {
          value: day('1985-10-15 00:00:00'),
          format: 'MM-DD-YYYY'
        }
      })

      expect(wrapper.find('.SDescDay .value').text()).toBe('10-15-1985')
    })

    test('shows `SDescEmpty` when the value is empty', () => {
      const wrapper = mount(SDescDay)

      expect(wrapper.find('.SDescDay').exists()).toBe(false)
      expect(wrapper.find('.SDescEmpty').exists()).toBe(true)
    })
  })

  describe('SDescPill', () => {
    test('renders a pill', () => {
      const wrapper = mount(SDescPill, {
        props: {
          pill: { label: 'Pill value' }
        }
      })

      expect(wrapper.find('.SDescPill .SPill .label').text()).toBe('Pill value')
    })

    test('renders multiple pills', () => {
      const wrapper = mount(SDescPill, {
        props: {
          pill: [
            { label: 'Pill A' },
            { label: 'Pill B' }
          ]
        }
      })

      const pills = wrapper.findAll('.SDescPill .pill')
      expect(pills.length).toBe(2)
      expect(pills.at(0).find('.label').text()).toBe('Pill A')
      expect(pills.at(1).find('.label').text()).toBe('Pill B')
    })

    test('shows `SDescEmpty` when the value is empty', () => {
      const wrapper = mount(SDescPill)

      expect(wrapper.find('.SDescPill').exists()).toBe(false)
      expect(wrapper.find('.SDescEmpty').exists()).toBe(true)
    })
  })

  describe('SDescState', () => {
    test('renders a state', () => {
      const wrapper = mount(SDescState, {
        props: {
          state: { label: 'State value' }
        }
      })

      expect(wrapper.find('.SDescState .SState .label').text()).toBe('State value')
    })

    test('shows `SDescEmpty` when the value is empty', () => {
      const wrapper = mount(SDescState)

      expect(wrapper.find('.SDescState').exists()).toBe(false)
      expect(wrapper.find('.SDescEmpty').exists()).toBe(true)
    })
  })
})
