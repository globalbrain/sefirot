import { flushPromises, mount } from '@vue/test-utils'
import { useDropdownPosition } from 'sefirot/composables/DropdownPosition'
import { Transition, defineComponent, h, nextTick, ref } from 'vue'

function rect(x: number, y: number, width: number, height: number) {
  return new DOMRect(x, y, width, height)
}

function setup(options: Parameters<typeof useDropdownPosition>[3] = {}) {
  const anchor = document.createElement('button')
  const popup = document.createElement('div')
  let anchorRect = rect(330, 590, 32, 32)
  let popupRect = rect(0, 0, 288, 200)
  anchor.getBoundingClientRect = () => anchorRect
  popup.getBoundingClientRect = () => popupRect
  Object.defineProperties(popup, {
    offsetWidth: { get: () => popupRect.width },
    offsetHeight: { get: () => popupRect.height }
  })
  document.body.append(anchor, popup)
  const open = ref(true)
  const wrapper = mount(defineComponent({
    setup() {
      useDropdownPosition(ref(anchor), ref(popup), open, options)
      return () => h('div')
    }
  }))
  return {
    popup, anchor, open, wrapper,
    move: (value: DOMRect) => { anchorRect = value },
    resize: (value: DOMRect) => { popupRect = value }
  }
}

describe('measured dropdown positioning', () => {
  beforeEach(() => {
    vi.spyOn(document.documentElement, 'clientWidth', 'get').mockReturnValue(375)
    vi.spyOn(document.documentElement, 'clientHeight', 'get').mockReturnValue(667)
    vi.spyOn(document.documentElement, 'getBoundingClientRect').mockReturnValue(rect(0, 0, 375, 667))
    vi.stubGlobal('innerWidth', 375)
    vi.stubGlobal('innerHeight', 667)
  })

  afterEach(() => {
    vi.restoreAllMocks()
    vi.unstubAllGlobals()
  })

  it('flips a measured menu above a bottom-edge anchor and contains it horizontally', async () => {
    const { popup, wrapper } = setup()
    await nextTick()
    await flushPromises()
    expect(popup.getAttribute('data-popper-placement')).toMatch(/^top/)
    expect(Number.parseFloat(popup.style.top)).toBe(382)
    expect(Number.parseFloat(popup.style.left)).toBeGreaterThanOrEqual(12)
    expect(Number.parseFloat(popup.style.left) + 288).toBeLessThanOrEqual(363)
    wrapper.unmount()
  })

  it('honors explicit top/right placement and follows scroll and changed content dimensions', async () => {
    const fixture = setup({ position: 'top', align: 'right' })
    fixture.move(rect(150, 300, 80, 32))
    fixture.resize(rect(0, 0, 160, 60))
    await nextTick()
    await flushPromises()
    expect(fixture.popup.style.left).toBe('70px')
    expect(fixture.popup.style.top).toBe('232px')
    fixture.move(rect(150, 240, 80, 32))
    fixture.resize(rect(0, 0, 160, 100))
    window.dispatchEvent(new Event('scroll'))
    await flushPromises()
    expect(fixture.popup.style.top).toBe('132px')
    fixture.wrapper.unmount()
  })

  it('bounds menus to the moving visual viewport when the keyboard opens', async () => {
    const viewport = Object.assign(new EventTarget(), { width: 375, height: 667, offsetLeft: 0, offsetTop: 0 })
    vi.stubGlobal('visualViewport', viewport)
    const { popup, wrapper } = setup()
    await nextTick()
    await flushPromises()
    Object.assign(viewport, { width: 320, height: 240, offsetLeft: 40, offsetTop: 200 })
    viewport.dispatchEvent(new Event('resize'))
    await flushPromises()
    expect(popup.style.maxWidth).toBe('296px')
    expect(popup.style.maxHeight).toBe('216px')
    expect(Number.parseFloat(popup.style.left)).toBeGreaterThanOrEqual(52)
    expect(Number.parseFloat(popup.style.top)).toBeGreaterThanOrEqual(212)
    expect(Number.parseFloat(popup.style.top) + 200).toBeLessThanOrEqual(428)
    wrapper.unmount()
  })

  it('preserves placement until a Vue leave transition finishes', async () => {
    const open = ref(true)
    const anchor = ref<HTMLElement>()
    const popup = ref<HTMLElement>()
    let finishLeave!: () => void
    const wrapper = mount(defineComponent({
      setup() {
        useDropdownPosition(anchor, popup, open)
        return () => h('div', [
          h('button', { ref: anchor }),
          h(Transition, { css: false, onLeave: (_element: Element, done: () => void) => { finishLeave = done } },
            () => open.value ? h('div', { ref: popup, class: 'popup' }, 'Menu') : null)
        ])
      }
    }), { attachTo: document.body, global: { stubs: { transition: false } } })
    await nextTick()
    await flushPromises()
    const element = popup.value!
    const placement = element.style.cssText
    expect(placement).toContain('top:')
    open.value = false
    await nextTick()
    expect(element.isConnected).toBe(true)
    expect(element.style.cssText).toBe(placement)
    finishLeave()
    await nextTick()
    expect(element.isConnected).toBe(false)
    wrapper.unmount()
  })

  it('removes tracking on close and recreates it on reopen', async () => {
    const { popup, open, move, wrapper } = setup()
    await nextTick()
    await flushPromises()
    expect(popup.style.maxWidth).toBe('351px')
    open.value = false
    await nextTick()
    const leavingStyle = popup.style.cssText
    vi.stubGlobal('innerWidth', 500)
    window.dispatchEvent(new Event('resize'))
    await flushPromises()
    expect(popup.style.cssText).toBe(leavingStyle)
    move(rect(24, 24, 60, 32))
    open.value = true
    await nextTick()
    await flushPromises()
    expect(popup.style.top).toBe('64px')
    wrapper.unmount()
    expect(popup.style.maxWidth).toBe('476px')
  })
})
