# SModal

`SModal` teleports dialog content into `#sefirot-modals`. The application controls visibility through `open` and handles `close` to dismiss it.

## Focus management

`manageFocus` enables dialog semantics, focus containment, background isolation with `inert`, and focus return. It defaults to `false` for compatibility with dialogs that already manage focus. Modal dimensions and dropdown positioning are unaffected.

```vue
<SModal
  :open="open"
  manage-focus
  aria-labelledby="confirmation-title"
  initial-focus="#cancel"
  @close="open = false"
>
  <SCard>
    <SCardBlock>
      <h2 id="confirmation-title">Confirm changes</h2>
      <button id="cancel" @click="open = false">Cancel</button>
      <button @click="save">Save</button>
    </SCardBlock>
  </SCard>
</SModal>
```

An accessible name comes from `ariaLabel` or `ariaLabelledby`; `ariaDescribedby` optionally references explanatory text. A managed modal receives `role="dialog"` and `aria-modal="true"`.

Focus enters the `initialFocus` selector within the modal, or its first focusable control. A dialog without focusable controls receives focus itself. Tab and Shift+Tab remain within the active dialog. Closing or unmounting returns focus to its opener when that element still exists. Nested managed modals pause the parent trap and restore it when the child closes.

Escape emits `close` only when `closable` is true. An inner dropdown consumes Escape first while open. Escape during IME composition is ignored. Backdrop clicks continue to follow `closable`; `open` remains application-controlled.

## Migration and teleported controls

Enabling `manageFocus` replaces application-level focus traps, dialog roles, and Escape listeners for that dialog. A second trap or dismissal listener can interfere with nested focus and dismissal.

The trap normally contains the modal's DOM subtree. `focusContainers` accepts additional element references for controls teleported outside that subtree. The list can change while the modal is open; null or undefined references are ignored. Each reference must identify only content belonging to this dialog, not a shared teleport host containing unrelated dialogs.

```vue
<SModal
  :open="open"
  manage-focus
  aria-label="Edit record"
  :focus-containers="[editorPopup]"
  @close="open = false"
>
  <!-- Dialog content -->
</SModal>
```

Teleported content still needs its appropriate accessibility relationship to the dialog or controlling input. An external editor that cannot supply its container requires migration before focus management is enabled. Existing Lens dialogs remain unchanged until they opt in.
