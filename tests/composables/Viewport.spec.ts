import { mount } from '@vue/test-utils'
import SModal from 'sefirot/components/SModal.vue'
import { useManualDropdownPosition } from 'sefirot/composables/Dropdown'
import { provideOverlays, useOverlayPosition } from 'sefirot/composables/Overlays'
import { defineComponent, h, nextTick, ref } from 'vue'

describe('visible viewport overlays', () => {
  afterEach(() => { vi.unstubAllGlobals() })

  it('keeps a desktop anchor popup and modal inside a moving, keyboard-sized viewport', async () => {
    const viewport = Object.assign(new EventTarget(), {
      offsetLeft: 0, offsetTop: 0, width: 320, height: 568
    })
    vi.stubGlobal('visualViewport', viewport)
    const anchor = document.createElement('button')
    const popup = document.createElement('div')
    anchor.getBoundingClientRect = () => new DOMRect(1000, 460, 100, 40)
    popup.getBoundingClientRect = () => new DOMRect(0, 0, 400, 300)
    let position!: ReturnType<typeof useOverlayPosition>
    const wrapper = mount(defineComponent({
      setup() {
        provideOverlays()
        position = useOverlayPosition(ref(anchor), ref(popup))
        return () => h(SModal, { open: true, ariaLabel: 'Viewport test' })
      }
    }), { attachTo: document.body })
    await nextTick()
    expect(position.inset.value).toMatchObject({ left: '12px', top: '152px', maxWidth: '296px' })
    Object.assign(viewport, { offsetLeft: 40, offsetTop: 200, width: 280, height: 200 })
    viewport.dispatchEvent(new Event('resize'))
    await nextTick()
    expect(position.inset.value).toMatchObject({ left: '52px', top: '212px', maxWidth: '256px', maxHeight: '176px' })
    const dialog = document.querySelector<HTMLElement>('[role="dialog"]')!
    expect(dialog.style.left).toBe('40px')
    expect(dialog.style.top).toBe('200px')
    expect(dialog.style.height).toBe('200px')
    wrapper.unmount()
  })
})

describe('dropdown positioning compatibility', () => {
  it('retains actual-height top alignment and a writable position for unmigrated Lens callers', async () => {
    const anchor = document.createElement('button')
    anchor.getBoundingClientRect = () => new DOMRect(100, 500, 100, 40)
    let position!: ReturnType<typeof useManualDropdownPosition>
    const wrapper = mount(defineComponent({
      setup() {
        provideOverlays()
        position = useManualDropdownPosition(ref(anchor), 'top')
        return () => h('div')
      }
    }))
    await nextTick()
    expect(position.inset.value).toEqual({ top: '492px', left: '100px', transform: 'translateY(-100%)' })
    position.position.value = 'bottom'
    expect(position.inset.value).toEqual({ top: '548px', left: '100px' })
    wrapper.unmount()
  })

  it('positions a migrated short editor using its measured height', async () => {
    const viewport = Object.assign(new EventTarget(), { offsetLeft: 0, offsetTop: 0, width: 1024, height: 768 })
    vi.stubGlobal('visualViewport', viewport)
    const anchor = document.createElement('button')
    const popup = document.createElement('div')
    anchor.getBoundingClientRect = () => new DOMRect(100, 500, 100, 40)
    popup.getBoundingClientRect = () => new DOMRect(0, 0, 224, 96)
    let position!: ReturnType<typeof useOverlayPosition>
    const wrapper = mount(defineComponent({
      setup() {
        position = useOverlayPosition(ref(anchor), ref(popup), { position: 'top' })
        return () => h('div')
      }
    }))
    await nextTick()
    expect(position.inset.value.top).toBe('396px')
    wrapper.unmount()
    vi.unstubAllGlobals()
  })
})
