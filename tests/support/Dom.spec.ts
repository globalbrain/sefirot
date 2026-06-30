import * as Dom from 'sefirot/support/Dom'

function input(type: string): HTMLInputElement {
  const el = document.createElement('input')
  el.type = type
  return el
}

function keydown(
  target: EventTarget | null,
  init: Partial<KeyboardEvent> = {}
): KeyboardEvent {
  return { key: 'Enter', ctrlKey: false, metaKey: false, altKey: false, shiftKey: false, isComposing: false, target, ...init } as KeyboardEvent
}

describe('support/Dom', () => {
  describe('isTextLikeInput', () => {
    it('returns true for plain text-like input types', () => {
      for (const type of ['text', 'search', 'url', 'email', 'tel', 'password', 'number']) {
        expect(Dom.isTextLikeInput(input(type))).toBe(true)
      }
    })

    it('returns false for non-text input types', () => {
      for (const type of ['checkbox', 'radio', 'file', 'range', 'color', 'date']) {
        expect(Dom.isTextLikeInput(input(type))).toBe(false)
      }
    })

    it('returns false for a textarea (Enter inserts a newline)', () => {
      expect(Dom.isTextLikeInput(document.createElement('textarea'))).toBe(false)
    })

    it('returns false for non-input elements and null', () => {
      expect(Dom.isTextLikeInput(document.createElement('div'))).toBe(false)
      expect(Dom.isTextLikeInput(null)).toBe(false)
    })
  })

  describe('isEditorSubmitKeydown', () => {
    it('submits on bare Enter from a text-like input', () => {
      expect(Dom.isEditorSubmitKeydown(keydown(input('text')))).toBe(true)
    })

    it('does not submit on bare Enter from a textarea or other control', () => {
      expect(Dom.isEditorSubmitKeydown(keydown(document.createElement('textarea')))).toBe(false)
      expect(Dom.isEditorSubmitKeydown(keydown(document.createElement('div')))).toBe(false)
    })

    it('submits on Ctrl/Cmd+Enter from any control', () => {
      const textarea = document.createElement('textarea')
      expect(Dom.isEditorSubmitKeydown(keydown(textarea, { ctrlKey: true }))).toBe(true)
      expect(Dom.isEditorSubmitKeydown(keydown(textarea, { metaKey: true }))).toBe(true)
      expect(Dom.isEditorSubmitKeydown(keydown(document.createElement('div'), { metaKey: true }))).toBe(true)
    })

    it('does not submit on Shift+Enter or Alt+Enter from a textarea (reserved for newlines)', () => {
      const textarea = document.createElement('textarea')
      expect(Dom.isEditorSubmitKeydown(keydown(textarea, { shiftKey: true }))).toBe(false)
      expect(Dom.isEditorSubmitKeydown(keydown(textarea, { altKey: true }))).toBe(false)
    })

    it('does not submit while an IME is composing (the committing Enter), even with a modifier', () => {
      expect(Dom.isEditorSubmitKeydown(keydown(input('text'), { isComposing: true }))).toBe(false)
      expect(Dom.isEditorSubmitKeydown(keydown(input('text'), { isComposing: true, metaKey: true }))).toBe(false)
    })

    it('does not submit on non-Enter keys', () => {
      expect(Dom.isEditorSubmitKeydown(keydown(input('text'), { key: 'a' } as Partial<KeyboardEvent>))).toBe(false)
      expect(Dom.isEditorSubmitKeydown(keydown(input('text'), { key: 'Tab' } as Partial<KeyboardEvent>))).toBe(false)
    })
  })

  describe('isEditorCancelKeydown', () => {
    it('cancels on Escape', () => {
      expect(Dom.isEditorCancelKeydown(keydown(input('text'), { key: 'Escape' } as Partial<KeyboardEvent>))).toBe(true)
    })

    it('does not cancel while an IME is composing (Escape reverts the candidate)', () => {
      expect(Dom.isEditorCancelKeydown(keydown(input('text'), { key: 'Escape', isComposing: true } as Partial<KeyboardEvent>))).toBe(false)
    })

    it('does not cancel on other keys', () => {
      expect(Dom.isEditorCancelKeydown(keydown(input('text'), { key: 'Enter' }))).toBe(false)
    })
  })

  describe('dispatchEditorKeydown', () => {
    function dispatch(init: Partial<KeyboardEvent> & { shield?: boolean } = {}) {
      const { shield, ...eventInit } = init
      const calls = { cancel: 0, submit: 0, preventDefault: 0, stopPropagation: 0 }
      const event = {
        ...keydown(input('text'), eventInit),
        preventDefault: () => { calls.preventDefault++ },
        stopPropagation: () => { calls.stopPropagation++ }
      } as KeyboardEvent
      Dom.dispatchEditorKeydown(event, {
        cancel: () => { calls.cancel++ },
        submit: () => { calls.submit++ },
        shield
      })
      return calls
    }

    it('submits on Enter from a text input', () => {
      expect(dispatch({ key: 'Enter' })).toMatchObject({ submit: 1, cancel: 0, preventDefault: 1 })
    })

    it('cancels on Escape', () => {
      expect(dispatch({ key: 'Escape' } as Partial<KeyboardEvent>)).toMatchObject({ cancel: 1, submit: 0, preventDefault: 1 })
    })

    it('does not cancel on Escape while composing, and does not shield by default', () => {
      expect(dispatch({ key: 'Escape', isComposing: true } as Partial<KeyboardEvent>))
        .toMatchObject({ cancel: 0, preventDefault: 0, stopPropagation: 0 })
    })

    it('shields Escape from the surrounding surface, cancelling when not composing', () => {
      expect(dispatch({ key: 'Escape', shield: true } as Partial<KeyboardEvent> & { shield?: boolean }))
        .toMatchObject({ stopPropagation: 1, cancel: 1, preventDefault: 1 })
    })

    it('shields the composing Escape too, without cancelling the edit', () => {
      expect(dispatch({ key: 'Escape', isComposing: true, shield: true } as Partial<KeyboardEvent> & { shield?: boolean }))
        .toMatchObject({ stopPropagation: 1, cancel: 0, preventDefault: 0 })
    })

    it('ignores other keys', () => {
      expect(dispatch({ key: 'a' } as Partial<KeyboardEvent>)).toMatchObject({ cancel: 0, submit: 0 })
    })
  })

  describe('focusFirstEditable', () => {
    it('focuses the first focusable control in the container', () => {
      const container = document.createElement('div')
      const el = document.createElement('input')
      container.append(el)
      document.body.append(container)

      Dom.focusFirstEditable(container)
      expect(document.activeElement).toBe(el)

      container.remove()
    })

    it('does nothing for a null container', () => {
      expect(() => Dom.focusFirstEditable(null)).not.toThrow()
    })

    it('skips candidates inside the default `.actions` row (e.g. Cancel/Save)', () => {
      const container = document.createElement('div')
      const action = document.createElement('div')
      action.className = 'actions'
      const button = document.createElement('div')
      button.setAttribute('tabindex', '0')
      action.append(button)
      container.append(action)
      document.body.append(container)

      Dom.focusFirstEditable(container)
      expect(document.activeElement).not.toBe(button)

      container.remove()
    })

    it('focuses the field input before the skipped action row', () => {
      const container = document.createElement('div')
      const el = document.createElement('input')
      const action = document.createElement('div')
      action.className = 'actions'
      const button = document.createElement('div')
      button.setAttribute('tabindex', '0')
      action.append(button)
      container.append(el, action)
      document.body.append(container)

      Dom.focusFirstEditable(container)
      expect(document.activeElement).toBe(el)

      container.remove()
    })
  })
})
