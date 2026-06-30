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
  return { key: 'Enter', ctrlKey: false, metaKey: false, altKey: false, shiftKey: false, target, ...init } as KeyboardEvent
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

    it('does not submit on non-Enter keys', () => {
      expect(Dom.isEditorSubmitKeydown(keydown(input('text'), { key: 'a' } as Partial<KeyboardEvent>))).toBe(false)
      expect(Dom.isEditorSubmitKeydown(keydown(input('text'), { key: 'Tab' } as Partial<KeyboardEvent>))).toBe(false)
    })
  })
})
