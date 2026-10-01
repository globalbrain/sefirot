import { mount } from '@vue/test-utils'
import SButton from 'sefirot/components/SButton.vue'
import SCardBlock from 'sefirot/components/SCardBlock.vue'
import SControl from 'sefirot/components/SControl.vue'
import SGrid from 'sefirot/components/SGrid.vue'
import SGridItem from 'sefirot/components/SGridItem.vue'
import SInputText from 'sefirot/components/SInputText.vue'
import { type LayoutMode, provideLayout } from 'sefirot/composables/Layout'
import { Teleport, defineComponent, h, nextTick, ref } from 'vue'

describe('resolved application layout', () => {
  it('keeps legacy defaults without a provider', () => {
    const input = mount(SInputText, { props: { modelValue: null } })
    const control = mount(SControl)
    expect(input.attributes('data-layout')).toBe('desktop')
    expect(control.classes()).not.toContain('wrap')
    input.unmount()
    control.unmount()
  })

  it('preserves scalar grid fallback values used by existing callers', () => {
    const grid = mount(SGrid, { props: { cols: 0, gap: 12, gapRow: 0 } })
    expect(grid.attributes('style')).toContain('repeat(1,')
    expect(grid.attributes('style')).toContain('--gap: 12px 12px')
    grid.unmount()
  })

  it('switches grids and teleported controls together without changing sibling applications', async () => {
    const mode = ref<LayoutMode>('mobile')
    const sibling = mount(SButton)
    const wrapper = mount(defineComponent({
      setup() {
        provideLayout(mode)
        return () => h('div', [
          h(SCardBlock, { size: 'medium', padding: { desktop: 24, mobile: 16 } }, () => h(SControl)),
          h(SGrid, { cols: { desktop: 3, mobile: 1 }, gap: 12, gapRow: { desktop: 16, mobile: 0 } }, () => h(SGridItem, { span: 2 })),
          h(Teleport, { to: '#sefirot-modals' }, [h(SButton, { label: 'Dialog action' })])
        ])
      }
    }), { attachTo: document.body })
    await nextTick()
    expect(wrapper.find('.SControl').classes()).toContain('wrap')
    expect(wrapper.find('.SCardBlock').classes()).toContain('fluid')
    expect(wrapper.find('.SCardBlock').attributes('style')).toContain('padding: 16px')
    expect(wrapper.find('.SGrid').attributes('style')).toContain('repeat(1,')
    expect(wrapper.find('.SGrid').attributes('style')).toContain('--gap: 0px 12px')
    expect(wrapper.find('.SGridItem').attributes('style')).toContain('span 1')
    expect(document.querySelector('#sefirot-modals .SButton')?.getAttribute('data-layout')).toBe('mobile')
    expect(document.querySelector('#sefirot-modals .SButton')?.classList.contains('wrap')).toBe(true)
    expect(sibling.find('.SButton').attributes('data-layout')).toBe('desktop')

    mode.value = 'desktop'
    await nextTick()
    expect(wrapper.find('.SControl').classes()).not.toContain('wrap')
    expect(wrapper.find('.SCardBlock').classes()).not.toContain('fluid')
    expect(wrapper.find('.SCardBlock').attributes('style')).toContain('padding: 24px')
    expect(wrapper.find('.SGrid').attributes('style')).toContain('repeat(3,')
    expect(wrapper.find('.SGridItem').attributes('style')).toContain('span 2')
    expect(document.querySelector('#sefirot-modals .SButton')?.getAttribute('data-layout')).toBe('desktop')
    wrapper.unmount()
    sibling.unmount()
  })
})
