# Overlays

Managed overlays add visible-viewport bounds and modal focus handling. They are opt-in independently of the [resolved layout mode](./layout). Existing consumers retain their modal and dropdown behavior until they enable this feature.

```ts
import { provideOverlays } from '@globalbrain/sefirot/lib/composables/Overlays'

provideOverlays()
```

The provider accepts a boolean, ref, or getter and follows the Vue component tree through Teleport. It applies to descendant modals, action menus, input dropdowns and addons, and table header menus. `useOverlays()` returns a computed boolean; its default is `false`.

Viewport bounds apply in both mobile and desktop layout modes. An application can keep its desktop-layout switch enabled on a phone while menus and dialogs remain within the visible viewport. The application still supplies its layout breakpoint and persists the user's preference.

## Modals

```vue
<SModal
  :open="open"
  aria-label="Edit member"
  initial-focus="#member-name"
  @close="open = false"
>
  <SCard>
    <!-- Dialog contents, including the initial-focus target. -->
  </SCard>
</SModal>
```

A managed modal receives `role="dialog"` and `aria-modal="true"`. Supply `aria-label` or `aria-labelledby` for its accessible name; `aria-describedby` is optional. Focus enters the `initial-focus` selector, the first enabled focusable descendant, or the dialog itself. Tab and Shift+Tab cycle within the topmost managed dialog, and closing restores focus to its opener if it is still connected.

Escape closes the topmost managed modal when `closable` is true. An inner control that prevents the Escape event can consume it first. A non-closable modal still traps focus. Backdrop dismissal continues to follow `closable`.

The `managed` prop overrides the provider for one modal and its descendants. `<SModal managed>` enables the behavior without a provider; `:managed="false"` supports gradual migration of dialogs with existing focus handling. Application focus traps and Escape listeners need to be removed from dialogs migrated to managed mode to avoid duplicate handling. Focusable controls teleported outside the dialog's DOM subtree are not part of its trap; those dialogs require a separate migration before opting in.

## Positioning helpers

`useOverlayPosition(anchor, floating, options?)` provides measured, fixed-position bounds for custom overlays. Both element refs are required. Its optional reactive `position` and `align` preferences resolve against the visible viewport, including visual-viewport changes. Apply the returned `inset` to the floating element and call `update()` after opening it. The floating element must use `position: fixed` and support scrolling within the returned maximum size.

The existing `useDropdownPosition` and `useManualDropdownPosition` helpers retain their public types, writable position state, and placement behavior. Existing consumers, including Lens editors, require an explicit migration to use the new helper.
