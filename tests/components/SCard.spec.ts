import { mount } from '@vue/test-utils'
import SCard from 'sefirot/components/SCard.vue'
import SCardBlock from 'sefirot/components/SCardBlock.vue'
import SCardFooter from 'sefirot/components/SCardFooter.vue'
import SCardFooterAction from 'sefirot/components/SCardFooterAction.vue'
import SCardFooterActions from 'sefirot/components/SCardFooterActions.vue'
import SCardHeader from 'sefirot/components/SCardHeader.vue'
import SCardHeaderAction from 'sefirot/components/SCardHeaderAction.vue'
import SCardHeaderActionClose from 'sefirot/components/SCardHeaderActionClose.vue'
import SCardHeaderActionCollapse from 'sefirot/components/SCardHeaderActionCollapse.vue'
import SCardHeaderActions from 'sefirot/components/SCardHeaderActions.vue'
import SCardHeaderTitle from 'sefirot/components/SCardHeaderTitle.vue'
import { assertEmitted } from 'tests/Utils'
import { h } from 'vue'
import IconX from '~icons/ph/x-bold'

describe('components/SCard', () => {
  describe('SCard', () => {
    test('renders `SCard` element', () => {
      const wrapper = mount(SCard)
      expect(wrapper.find('.SCard').exists()).toBe(true)
    })
  })

  describe('SCardHeader', () => {
    test('renders `SCardHeader` element', () => {
      const wrapper = mount(SCardHeader)
      expect(wrapper.find('.SCardHeader').exists()).toBe(true)
    })
  })

  describe('SCardHeaderTitle', () => {
    test('renders `SCardHeaderTitle` element', () => {
      const wrapper = mount(SCardHeaderTitle)
      expect(wrapper.find('.SCardHeaderTitle').exists()).toBe(true)
    })
  })

  describe('SCardHeaderActions', () => {
    test('renders `SCardHeaderActions` element', () => {
      const wrapper = mount(SCardHeaderActions)
      expect(wrapper.find('.SCardHeaderActions').exists()).toBe(true)
    })
  })

  describe('SCardHeaderAction', () => {
    test('renders `SCardHeaderAction` element', () => {
      const wrapper = mount(SCardHeaderAction, {
        props: {
          icon: IconX
        }
      })

      expect(wrapper.find('.SCardHeaderAction').exists()).toBe(true)
    })

    test('emits `click` on click', () => {
      const wrapper = mount(SCardHeaderAction, {
        props: {
          icon: IconX
        }
      })

      wrapper.find('.SButton').trigger('click')

      assertEmitted(wrapper, 'click', 1, undefined)
    })
  })

  describe('SCardHeaderActionClose', () => {
    test('renders `SCardHeaderActionClose` element', () => {
      const wrapper = mount(SCardHeaderActionClose)
      expect(wrapper.find('.SCardHeaderActionClose').exists()).toBe(true)
    })

    test('emits `click` on click', () => {
      const wrapper = mount(SCardHeaderActionClose)

      wrapper.find('.SButton').trigger('click')

      assertEmitted(wrapper, 'click', 1, undefined)
    })
  })

  describe('SCardHeaderActionCollapse', () => {
    test('renders `SCardHeaderActionCollapse` element', () => {
      const wrapper = mount(SCard, {
        slots: {
          default: SCardHeaderActionCollapse
        }
      })

      expect(wrapper.find('.SCardHeaderActionCollapse').exists()).toBe(true)
    })

    test('sets default collapsed value via `:collapsed` prop', async () => {
      const wrapper = mount(SCard, {
        slots: {
          default: () => h(SCardHeaderActionCollapse, {
            collapsed: true
          })
        }
      })

      expect(wrapper.find('.SCardHeaderActionCollapse').classes('collapsed')).toBe(true)
    })

    test('toggles state when clicked', async () => {
      const wrapper = mount(SCard, {
        slots: {
          default: SCardHeaderActionCollapse
        }
      })

      await wrapper.find('.SCard .SCardHeaderActionCollapse .SButton').trigger('click')
      expect(wrapper.find('.SCard').classes('collapsed')).toBe(true)

      await wrapper.find('.SCard .SCardHeaderActionCollapse .SButton').trigger('click')
      expect(wrapper.find('.SCard').classes('collapsed')).toBe(false)
    })
  })

  describe('SCardFooter', () => {
    test('renders `SCardFooter` element', () => {
      const wrapper = mount(SCardFooter)
      expect(wrapper.find('.SCardFooter').exists()).toBe(true)
    })
  })

  describe('SCardFooterActions', () => {
    test('renders `SCardFooterActions` element', () => {
      const wrapper = mount(SCardFooterActions)
      expect(wrapper.find('.SCardFooterActions').exists()).toBe(true)
    })
  })

  describe('SCardFooterAction', () => {
    test('renders `SCardFooterAction` element', () => {
      const wrapper = mount(SCardFooterAction)
      expect(wrapper.find('.SCardFooterAction').exists()).toBe(true)
    })

    test('emits `click` on click', async () => {
      const wrapper = mount(SCardFooterAction, {
        props: {
          icon: IconX
        }
      })

      wrapper.find('.SButton').trigger('click')

      assertEmitted(wrapper, 'click', 1, undefined)
    })
  })

  describe('SCardFooterBlock', () => {
    test('renders `SCardBlock` element', () => {
      const wrapper = mount(SCardBlock)
      expect(wrapper.find('.SCardBlock').exists()).toBe(true)
    })
  })
})
