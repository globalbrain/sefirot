import { enableAutoUnmount, mount } from '@vue/test-utils'
import SActionMenu from 'sefirot/components/SActionMenu.vue'
import SInputDropdown from 'sefirot/components/SInputDropdown.vue'
import SModal from 'sefirot/components/SModal.vue'
import { Teleport, defineComponent, h, nextTick, ref } from 'vue'

enableAutoUnmount(afterEach)

function key(key: string, shiftKey = false, isComposing = false) {
  const event = new KeyboardEvent('keydown', { key, shiftKey, isComposing, bubbles: true, cancelable: true })
  document.activeElement?.dispatchEvent(event)
  return event
}

function opener() {
  const button = document.createElement('button')
  document.body.append(button)
  button.focus()
  return button
}

describe('managed modal focus', () => {
  beforeEach(() => {
    // happy-dom has no layout; provide visible rectangles for tabbable's visibility check.
    vi.spyOn(HTMLElement.prototype, 'getClientRects').mockImplementation(function (this: HTMLElement) {
      const visible = !this.closest('[hidden]') && getComputedStyle(this).display !== 'none'
      const rect = new DOMRect(0, 0, 20, 20)
      return (visible ? [rect] : []) as unknown as DOMRectList
    })
  })
  afterEach(() => vi.restoreAllMocks())

  it('names the dialog, traps control types, isolates the background, and restores the opener', async () => {
    const button = opener()
    const preserved = document.createElement('div')
    preserved.inert = true
    document.body.append(preserved)
    const wrapper = mount(SModal, {
      attachTo: document.body,
      props: { open: true, manageFocus: true, ariaLabelledby: 'title', ariaDescribedby: 'description' },
      slots: { default: '<h2 id="title">Title</h2><p id="description">Description</p><button disabled>Disabled</button><div hidden><button>Hidden</button></div><input id="first"><a href="#">Link</a><select id="last"><option>A</option></select>' }
    })
    await nextTick()
    const dialog = document.querySelector('[role="dialog"]')!
    expect(dialog.getAttribute('aria-modal')).toBe('true')
    expect(dialog.getAttribute('aria-labelledby')).toBe('title')
    expect(dialog.getAttribute('aria-describedby')).toBe('description')
    expect(document.activeElement?.id).toBe('first')
    expect(button.inert).toBe(true)
    expect(key('Tab', true).defaultPrevented).toBe(true)
    expect(document.activeElement?.id).toBe('last')
    key('Tab')
    expect(document.activeElement?.id).toBe('first')
    await wrapper.setProps({ open: false })
    expect(document.activeElement).toBe(button)
    expect(button.inert).toBe(false)
    expect(preserved.inert).toBe(true)
    wrapper.unmount()
  })

  it('honors initial focus, closable=false, and IME composition', async () => {
    opener()
    const wrapper = mount(SModal, {
      props: { open: true, manageFocus: true, closable: false, ariaLabel: 'Confirm', initialFocus: '#cancel' },
      slots: { default: '<input><button id="cancel">Cancel</button>' }, attachTo: document.body
    })
    await nextTick()
    expect(document.activeElement?.id).toBe('cancel')
    key('Escape')
    document.querySelector('.SModal')!.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }))
    expect(wrapper.emitted('close')).toBeUndefined()
    await wrapper.setProps({ closable: true })
    expect(key('Escape', false, true).defaultPrevented).toBe(false)
    expect(wrapper.emitted('close')).toBeUndefined()
    key('Escape')
    expect(wrapper.emitted('close')).toHaveLength(1)
    // Emitting close does not deactivate a still-open controlled modal.
    expect(key('Tab').defaultPrevented).toBe(true)
    wrapper.unmount()
  })

  it('falls back from a disabled initial target and focuses an empty dialog', async () => {
    const button = opener()
    const wrapper = mount(SModal, {
      props: { open: true, manageFocus: true, initialFocus: '#disabled' },
      slots: { default: '<button id="disabled" disabled>Disabled</button><input id="available">' }, attachTo: document.body
    })
    await nextTick()
    expect(document.activeElement?.id).toBe('available')
    wrapper.unmount()
    expect(document.activeElement).toBe(button)
    const empty = mount(SModal, { props: { open: true, manageFocus: true }, attachTo: document.body })
    await nextTick()
    expect(document.activeElement?.classList.contains('SModal')).toBe(true)
    expect(key('Tab').defaultPrevented).toBe(true)
    empty.unmount()
    expect(document.activeElement).toBe(button)
  })

  it.each(['input', 'action'])('closes an inner %s menu before its modal', async (kind) => {
    opener()
    const close = vi.fn()
    const wrapper = mount(SModal, {
      props: { open: true, manageFocus: true, onClose: close },
      slots: { default: () => kind === 'input'
        ? h(SInputDropdown, { modelValue: null, options: [{ label: 'One', value: 1 }] })
        : h(SActionMenu, { label: 'Actions', options: [{ type: 'menu', options: [{ label: 'One' }] }] }) },
      attachTo: document.body
    })
    await nextTick()
    const trigger = document.querySelector<HTMLElement>(kind === 'input' ? '.SInputDropdown .box' : '.SActionMenu button')!
    trigger.click()
    await nextTick()
    key('Escape')
    await nextTick()
    expect(close).not.toHaveBeenCalled()
    expect(document.activeElement).toBe(trigger)
    key('Escape')
    expect(close).toHaveBeenCalledOnce()
    wrapper.unmount()
  })

  it('pauses nested parent traps and restores their isolation and focus on close', async () => {
    const button = opener()
    const nested = ref(false)
    const outerClose = vi.fn()
    const wrapper = mount(defineComponent({
      setup: () => () => h(SModal, { open: true, manageFocus: true, onClose: outerClose }, () => [
        h('button', { id: 'nested-opener', onClick: () => { nested.value = true } }, 'Open nested'),
        h(SModal, { open: nested.value, manageFocus: true, onClose: () => { nested.value = false } }, () => h('textarea', { id: 'nested-input' }))
      ])
    }), { attachTo: document.body })
    await nextTick()
    document.querySelector<HTMLElement>('#nested-opener')!.click()
    await nextTick()
    expect(document.activeElement?.id).toBe('nested-input')
    expect(document.querySelector('#nested-opener')!.closest('[inert]')).not.toBeNull()
    key('Escape')
    await nextTick()
    expect(outerClose).not.toHaveBeenCalled()
    expect(document.activeElement?.id).toBe('nested-opener')
    expect(document.querySelector('#nested-opener')!.closest('[inert]')).toBeNull()
    expect(button.inert).toBe(true)
    wrapper.unmount()
    expect(button.inert).toBe(false)
    expect(document.activeElement).toBe(button)
  })

  it('includes explicitly supplied teleported controls without admitting unrelated content', async () => {
    const button = opener()
    const external = ref<HTMLElement>()
    const show = ref(false)
    const wrapper = mount(defineComponent({
      setup: () => () => [
        h(SModal, { open: true, manageFocus: true, focusContainers: [external.value] }, () => h('button', { id: 'internal' }, 'Inside')),
        h(Teleport, { to: '#sefirot-modals' }, show.value ? h('div', { ref: external }, h('input', { id: 'external' })) : [])
      ]
    }), { attachTo: document.body })
    await nextTick()
    show.value = true
    await nextTick()
    await nextTick()
    const input = document.querySelector<HTMLElement>('#external')!
    expect(external.value!.inert).toBe(false)
    input.focus()
    expect(document.activeElement).toBe(input)
    key('Tab')
    expect(document.activeElement?.id).toBe('internal')
    key('Tab', true)
    expect(document.activeElement).toBe(input)
    expect(button.inert).toBe(true)
    show.value = false
    await nextTick()
    await nextTick()
    key('Tab')
    expect(document.activeElement?.id).toBe('internal')
    wrapper.unmount()
    expect(button.inert).toBe(false)
  })

  it('preserves legacy focus and Escape behavior until the modal opts in', async () => {
    const button = opener()
    const wrapper = mount(SModal, {
      props: { open: true }, slots: { default: '<input id="managed-input">' }, attachTo: document.body
    })
    await nextTick()
    expect(document.activeElement).toBe(button)
    expect(button.inert).toBe(false)
    expect(key('Escape').defaultPrevented).toBe(false)
    expect(document.querySelector('.SModal')!.hasAttribute('role')).toBe(false)
    await wrapper.setProps({ manageFocus: true })
    expect(document.activeElement?.id).toBe('managed-input')
    await wrapper.setProps({ manageFocus: false })
    expect(document.activeElement).toBe(button)
    expect(button.inert).toBe(false)
    wrapper.unmount()
  })
})
