<script setup lang="ts">
import IconActivity from '~icons/ph/activity-bold'
import IconEye from '~icons/ph/eye-bold'
import IconTrash from '~icons/ph/trash-bold'
import SActionList, { type ActionList } from 'sefirot/components/SActionList.vue'

const list: ActionList = [
  { leadIcon: IconActivity, label: 'Show activity' },
  { leadIcon: IconEye, label: 'Preview' },
  { leadIcon: IconTrash, label: 'Delete item' }
]
</script>

# SActionList

`<SAvatarList>` is a vertical list of interactive actions or options.

<Showcase
  path="/components/SActionList.vue"
  story="/stories-components-sactionlist-01-playground-story-vue"
>
  <SActionList :list />
</Showcase>

## Usage

`<SActionList>` takes a prop `:list` which is array of items to be listed as options.

```vue
<script setup lang="ts">
import IconActivity from '~icons/ph/activity-bold'
import IconEye from '~icons/ph/eye-bold'
import IconTrash from '~icons/ph/trash-bold'
import SActionList, { type ActionList } from '@globalbrain/sefirot/lib/components/SActionList.vue'

const list: ActionList = [
  { leadIcon: IconActivity, label: 'Show activity' },
  { leadIcon: IconEye, label: 'Preview' },
  { leadIcon: IconTrash, label: 'Delete item' }
]
</script>

<template>
  <SActionList :list />
</template>
```

## Props

### `:list`

The options to be listed.

```ts
interface Props {
  list?: ActionList
}

type ActionList = ActionListItem[]

interface ActionListItem {
  // The icon to be displayed on the left side of the text.
  leadIcon?: Component

  // The link to be navigated to when the item is clicked. When this
  // prop is set, the item is rendered via `<SLink>`.
  link?: string

  // The text to be displayed.
  label: string

  // Whether the item is disabled.
  disabled?: boolean

  // The tooltip to be displayed when the item is hovered or focused.
  tooltip?: Tooltip

  // The callback to be called when the item is clicked.
  onClick?(): void
}

interface Tooltip {
  // The HTML tag to be used for the tooltip.
  // Defaults to `span`.
  tag?: string | Component
  // The text to be displayed in the tooltip. The tooltip
  // will only be visible when this prop is set.
  text?: MaybeRef<string | null>

  // The position of the tooltip relative to the button.
  // Defaults to `top`
  position?: 'top' | 'right' | 'bottom' | 'left'

  // The trigger to show the tooltip.
  // Defaults to `both`
  trigger?: 'hover' | 'focus' | 'both'

  // The time after which the tooltip is hidden if triggered
  // because of focussing the trigger element (in milliseconds).
  // Defaults to `undefined` (the tooltip will not hide
  // automatically).
  timeout?: number
}
```

```vue-html
<SActionList :list="[...]" />
```

## Types

### `ActionList`

The type of the `:list` prop.

```ts
type ActionList = ActionListItem[]
```

### `ActionListItem`

The type of action list item. See `:list` for the details.
