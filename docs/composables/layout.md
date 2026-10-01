# Layout

Sefirot can follow an application's resolved `desktop` or `mobile` layout. Without a provider, components keep their desktop defaults. Sefirot does not select a breakpoint or persist a preference.

## Provide the resolved mode

Call `provideLayout` in an ancestor's setup, above the components that should follow the mode. It accepts a value, ref, computed ref, or getter. Vue's component context follows teleported dialogs; no selector on `html` or the teleport target is needed.

```vue
<script setup lang="ts">
import { provideLayout } from 'sefirot/composables/Layout'

// Use the application's existing breakpoint and preference resolver.
const { isMobile } = useApplicationLayout()
provideLayout(() => isMobile.value ? 'mobile' : 'desktop')
</script>

<template>
  <RouterView />
</template>
```

The application owns its breakpoint, desktop-layout switch, storage key, persistence, and navigation. A nested provider can scope a different mode to a subtree. `useLayout()` returns the current mode as a computed ref. `useResponsive(() => value)` is available to application components that need the same resolution.

## Responsive values

Supported props accept either their existing scalar value or `{ desktop, mobile }`. The desktop value is required; an omitted mobile value falls back to it. Responsive values such as `false` and `0` are preserved. Legacy scalar fallback behavior remains unchanged; use a responsive value to override a nonzero grid gap with zero on one axis.

```vue
<SCardBlock :padding="{ desktop: 24, mobile: 16 }">
  <SGrid :cols="{ desktop: 3, mobile: 1 }" :gap="{ desktop: 24, mobile: 12 }">
    <SGridItem :span="{ desktop: 2, mobile: 1 }">...</SGridItem>
  </SGrid>
</SCardBlock>
```

| Component | Responsive props | Mobile behavior |
| --- | --- | --- |
| `SCardBlock` | `padding`, `fluid` | `fluid` defaults to true: height grows with content; the size's minimum height remains. |
| `SControl` | `wrap` | Defaults to true; left/right groups wrap and shrink, and search controls fit the group. |
| `SGrid` | `cols`, `gap`, `gapRow`, `gapCol` | Columns change only when requested; zero gaps are supported. |
| `SGridItem` | `span` | Numeric spans are capped to the mobile parent column count to avoid implicit tracks. |
| `SDesc` | `cols`, `gap`, `dir`, `labelWidth`, `wrap` | Wrapping defaults to true; labels grow and text/link values break long words. |
| `SDescItem` | `span` | Follows `SGridItem`. |
| `SButton` | `wrap` | Defaults to true; labels wrap while icons retain their size. |
| `STable` | `contain`, `textLines` | Containment defaults to true. Text remains single-line unless `textLines` is set. |

Spacing and label widths accept numbers (pixels), numeric strings, or CSS lengths. `padding` also accepts CSS shorthands. Columns and spans retain their existing numeric/numeric-string meaning. Explicit scalar values apply in both modes, including `:wrap="false"` and `:fluid="false"`.

Replace conflicting padding utility classes when adopting `padding`: a utility with `!important` still takes precedence. Components do not infer which application grids should stack or which controls should be hidden. `SDescText` retains explicit `preWrap` and `lineClamp` choices.

## Touch controls

Mobile mode gives shared inputs 16 px typography and at least 44 px control boxes. Text and number inputs size their enclosing box, content area, and native input together. Select/dropdown carets remain centered; checkbox/radio labels can wrap. Textarea, date, HMS, and YMD inputs follow the same sizing contract. Buttons and local navigation links receive a 44 px minimum target; existing larger sizes remain larger.

`--control-touch-size` can increase the default target size. Set inherited CSS variables on a common ancestor of both the application and its teleport root (usually `:root`) when they must also affect dialogs. Layout mode itself uses Vue context and does not require this CSS ancestry.

## Tables

```vue
<STable :options="table" :text-lines="{ desktop: 1, mobile: 3 }" />
```

`textLines` reserves a fixed line budget for standard text/link cells and truncates longer values. Row height is at least the configured `options.rowSize`, 16 px vertical padding plus 24 px per text line, and 44 px in mobile mode. The virtualizer recalculates offsets when that height changes. Custom cells still need to fit the row height chosen by the application. Variable-height record cards are a separate presentation, not part of this API.

Containment lets tables shrink inside grid/flex parents while preserving columns and the existing internal horizontal scrolling. Header/body scrolling remains synchronized. No columns are hidden and no table content is converted into cards.

The **Components / Layout / 01. Responsive** story exercises long labels, populated inputs, responsive grids, virtualized rows, and forced desktop layout. Overlay positioning and dialog focus behavior are unchanged by the layout provider.
