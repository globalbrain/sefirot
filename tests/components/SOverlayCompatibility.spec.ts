import { mount } from '@vue/test-utils'
import SActionMenu from 'sefirot/components/SActionMenu.vue'
import SInputAddon from 'sefirot/components/SInputAddon.vue'
import SInputAsyncDropdown from 'sefirot/components/SInputAsyncDropdown.vue'
import SInputDropdown from 'sefirot/components/SInputDropdown.vue'
import { provideLayout } from 'sefirot/composables/Layout'
import { provideOverlays } from 'sefirot/composables/Overlays'
import { defineComponent, h, nextTick, ref } from 'vue'

describe('overlay opt-in', () => {
  it('preserves legacy menus and enables bounded positioning independently of layout mode', async () => {
    const enabled = ref(false)
    const wrapper = mount(defineComponent({
      setup() {
        provideLayout('desktop')
        provideOverlays(enabled)
        return () => h(SActionMenu, { label: 'Menu', options: [{ type: 'menu', options: [{ label: 'Item' }] }] })
      }
    }), { attachTo: document.body })
    await wrapper.find('.SButton').trigger('click')
    expect(wrapper.find('.dropdown').attributes('style')).not.toContain('max-width')
    expect(wrapper.find('.SDropdown').classes()).not.toContain('managed')
    await wrapper.find('.SActionMenu').trigger('keydown', { key: 'Escape' })
    expect(wrapper.find('.dropdown').attributes('style')).toContain('display: block')
    enabled.value = true
    await nextTick()
    expect(wrapper.find('.dropdown').attributes('style')).toContain('max-width')
    expect(wrapper.find('.SButton').attributes('data-layout')).toBe('desktop')
    expect(wrapper.find('.SDropdown').classes()).toContain('managed')
    await wrapper.find('.SActionMenu').trigger('keydown', { key: 'Escape' })
    expect(wrapper.find('.dropdown').attributes('style')).toContain('display: none')
    wrapper.unmount()
  })

  it.each([SInputDropdown, SInputAsyncDropdown])('keeps input popups on the legacy helper until enabled', async (component) => {
    const enabled = ref(false)
    const wrapper = mount(defineComponent({
      setup() {
        provideOverlays(enabled)
        return () => h(component as any, {
          modelValue: null,
          position: 'top',
          options: [{ label: 'One', value: 1 }],
          fetch: async () => [],
          toOption: (item: any) => item
        })
      }
    }), { attachTo: document.body })
    await wrapper.find('.box').trigger('click')
    await nextTick()
    expect(wrapper.find('.dropdown').attributes('style')).toContain('translateY(-100%)')
    enabled.value = true
    await nextTick()
    expect(wrapper.find('.dropdown').attributes('style')).not.toContain('translateY(-100%)')
    expect(wrapper.find('.dropdown').attributes('style')).toContain('max-width')
    wrapper.unmount()
  })

  it('leaves input addon positioning unchanged without an overlay provider', async () => {
    const wrapper = mount(SInputAddon, { props: { label: 'Menu', dropdown: [{ type: 'menu', options: [{ label: 'One' }] }] } })
    await wrapper.find('.action').trigger('click')
    expect(wrapper.find('.dialog').attributes('style')).toBeUndefined()
    expect(wrapper.classes()).not.toContain('managed')
    wrapper.unmount()
  })
})
