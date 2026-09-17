import { mount } from '@vue/test-utils'
import SInputDropdown from 'sefirot/components/SInputDropdown.vue'
import SModal from 'sefirot/components/SModal.vue'
import { provideLayout } from 'sefirot/composables/Layout'
import { OverlaysKey } from 'sefirot/composables/Overlays'
import { defineComponent, h, nextTick, ref } from 'vue'

function key(key: string, shiftKey = false) {
  const event = new KeyboardEvent('keydown', { key, shiftKey, bubbles: true, cancelable: true })
  document.activeElement?.dispatchEvent(event)
  return event
}

describe('components/SModal', () => {
  it('labels the dialog, enters focus, traps all control types, and restores the opener', async () => {
    const opener = document.createElement('button')
    document.body.append(opener)
    opener.focus()
    const wrapper = mount(SModal, {
      attachTo: document.body, global: { provide: { [OverlaysKey]: true } },
      props: { open: true, ariaLabelledby: 'title', ariaDescribedby: 'description' },
      slots: { default: '<h2 id="title">Title</h2><p id="description">Description</p><button disabled>Disabled</button><div hidden><button>Hidden</button></div><input id="first"><a href="#" id="link">Link</a><select id="last"><option>A</option></select>' }
    })
    await nextTick()
    const dialog = document.querySelector('[role="dialog"]')!
    expect(dialog.getAttribute('aria-modal')).toBe('true')
    expect(dialog.getAttribute('aria-labelledby')).toBe('title')
    expect(dialog.getAttribute('aria-describedby')).toBe('description')
    expect(document.activeElement?.id).toBe('first')
    expect(key('Tab', true).defaultPrevented).toBe(true)
    expect(document.activeElement?.id).toBe('last')
    key('Tab')
    expect(document.activeElement?.id).toBe('first')
    opener.focus()
    expect(document.activeElement?.id).toBe('first')
    await wrapper.setProps({ open: false })
    expect(document.activeElement).toBe(opener)
    wrapper.unmount()
  })

  it('supports explicit initial focus and keeps non-closable dialogs open on Escape and backdrop clicks', async () => {
    const wrapper = mount(SModal, {
      props: { open: true, closable: false, ariaLabel: 'Confirmation', initialFocus: '#cancel' },
      slots: { default: '<input><button id="cancel">Cancel</button>' },
      attachTo: document.body, global: { provide: { [OverlaysKey]: true } }
    })
    await nextTick()
    expect(document.activeElement?.id).toBe('cancel')
    key('Escape')
    document.querySelector('.SModal')!.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }))
    expect(wrapper.emitted('close')).toBeUndefined()
    await wrapper.setProps({ closable: true })
    key('Escape')
    expect(wrapper.emitted('close')).toHaveLength(1)
    wrapper.unmount()
  })

  it('falls back to an enabled control when initial focus cannot receive focus', async () => {
    const wrapper = mount(SModal, { props: { open: true, initialFocus: '#disabled' }, slots: { default: '<button id="disabled" disabled>Disabled</button><input id="available">' }, attachTo: document.body, global: { provide: { [OverlaysKey]: true } } })
    await nextTick()
    expect(document.activeElement?.id).toBe('available')
    wrapper.unmount()
  })

  it('focuses an empty dialog and restores focus when unmounted while open', async () => {
    const opener = document.createElement('button')
    document.body.append(opener)
    opener.focus()
    const wrapper = mount(SModal, { props: { open: true }, attachTo: document.body, global: { provide: { [OverlaysKey]: true } } })
    await nextTick()
    expect(document.activeElement?.classList.contains('SModal')).toBe(true)
    expect(key('Tab').defaultPrevented).toBe(true)
    wrapper.unmount()
    expect(document.activeElement).toBe(opener)
  })

  it('closes an inner dropdown before the dialog', async () => {
    const close = vi.fn()
    const wrapper = mount(SModal, {
      props: { open: true, onClose: close },
      slots: { default: () => h(SInputDropdown, { modelValue: null, options: [{ label: 'One', value: 1 }] }) },
      attachTo: document.body, global: { provide: { [OverlaysKey]: true } }
    })
    await nextTick()
    const box = document.querySelector<HTMLElement>('.SInputDropdown .box')!
    box.click()
    await nextTick()
    expect(document.querySelector('.SDropdown')).not.toBeNull()
    key('Escape')
    await nextTick()
    expect(document.querySelector('.SDropdown')).toBeNull()
    expect(close).not.toHaveBeenCalled()
    key('Escape')
    expect(close).toHaveBeenCalledOnce()
    wrapper.unmount()
  })

  it('traps and dismisses only the top modal, then restores focus inside its parent', async () => {
    const nested = ref(false)
    const outerClose = vi.fn()
    const wrapper = mount(defineComponent({
      setup: () => () => h(SModal, { open: true, onClose: outerClose }, () => [
        h('button', { id: 'nested-opener', onClick: () => { nested.value = true } }, 'Open nested'),
        h(SModal, { open: nested.value, onClose: () => { nested.value = false } }, () => h('textarea', { id: 'nested-input' }))
      ])
    }), { attachTo: document.body, global: { provide: { [OverlaysKey]: true } } })
    await nextTick()
    document.querySelector<HTMLElement>('#nested-opener')!.click()
    await nextTick()
    expect(document.activeElement?.id).toBe('nested-input')
    key('Tab')
    expect(document.activeElement?.id).toBe('nested-input')
    key('Escape')
    await nextTick()
    expect(outerClose).not.toHaveBeenCalled()
    expect(document.activeElement?.id).toBe('nested-opener')
    wrapper.unmount()
  })
})

describe('legacy modal compatibility', () => {
  it('does not take focus, trap Tab, or handle Escape when only layout is enabled', async () => {
    const opener = document.createElement('button')
    const outside = document.createElement('input')
    document.body.append(opener, outside)
    opener.focus()
    const close = vi.fn()
    const wrapper = mount(defineComponent({
      setup() {
        provideLayout('mobile')
        return () => h(SModal, { open: true, onClose: close }, () => h('input'))
      }
    }), { attachTo: document.body })
    await nextTick()
    expect(document.activeElement).toBe(opener)
    outside.focus()
    expect(document.activeElement).toBe(outside)
    expect(key('Tab').defaultPrevented).toBe(false)
    expect(key('Escape').defaultPrevented).toBe(false)
    expect(close).not.toHaveBeenCalled()
    const modal = document.querySelector<HTMLElement>('.SModal')!
    expect(modal.hasAttribute('role')).toBe(false)
    expect(modal.style.height).toBe('')
    expect(modal.classList.contains('managed')).toBe(false)
    wrapper.unmount()
  })

  it('supports a per-dialog override without changing other applications', async () => {
    const opener = document.createElement('button')
    document.body.append(opener)
    opener.focus()
    const wrapper = mount(SModal, {
      props: { open: true, managed: false },
      slots: { default: '<input id="managed-input">' },
      attachTo: document.body,
      global: { provide: { [OverlaysKey]: true } }
    })
    await nextTick()
    expect(document.activeElement).toBe(opener)
    await wrapper.setProps({ managed: true })
    expect(document.activeElement?.id).toBe('managed-input')
    await wrapper.setProps({ managed: false })
    expect(document.activeElement).toBe(opener)
    wrapper.unmount()
  })

  it('can manage one dialog without a provider, including its dropdowns', async () => {
    const wrapper = mount(SModal, {
      props: { open: true, managed: true, ariaLabel: 'One dialog' },
      slots: { default: () => h(SInputDropdown, { modelValue: null, options: [{ label: 'One', value: 1 }] }) },
      attachTo: document.body
    })
    await nextTick()
    expect(document.querySelector('.SModal')?.getAttribute('role')).toBe('dialog')
    expect(document.querySelector('.SInputDropdown')?.classList.contains('managed')).toBe(true)
    wrapper.unmount()
  })
})
