<script setup lang="ts">
import IconActivity from '@iconify-icons/ph/activity-bold'
import IconEye from '@iconify-icons/ph/eye-bold'
import IconTrash from '@iconify-icons/ph/trash-bold'
import SActionList, { type ActionList } from 'sefirot/components/SActionList.vue'

const list: ActionList = [
  { leadIcon: IconActivity, text: 'Show activity' },
  { leadIcon: IconEye, text: 'Preview' },
  { leadIcon: IconTrash, text: 'Delete item' }
]
</script>

# SActionList

`<SAvatarList>` is a vertical list of interactive actions or options.

<Showcase
  path="/components/SActionList.vue"
  story="/stories-components-sactionlist-01-playground-story-vue"
>
  <SActionList :list="list" />
</Showcase>

## Usage

`<SActionList>` takes a prop `:list` which is array of items to be listed as options.

```vue
<script setup lang="ts">
import IconActivity from '@iconify-icons/ph/activity-bold'
import IconEye from '@iconify-icons/ph/eye-bold'
import IconTrash from '@iconify-icons/ph/trash-bold'
import SActionList, { type ActionList } from '@globalbrain/sefirot/lib/components/SActionList.vue'

const list: ActionList = [
  { leadIcon: IconActivity, text: 'Show activity' },
  { leadIcon: IconEye, text: 'Preview' },
  { leadIcon: IconTrash, text: 'Delete item' }
]
</script>

<template>
  <SActionList :list="list" />
</template>
```

## Props

### `:list`

The options to be listed.

```ts
import { type IconifyIcon } from '@iconify/vue/dist/offline'

interface Props {
  list?: ActionList
}

type ActionList = ActionListItem[]

interface ActionListItem {
  // The icon to be displayed on the left side of the text.
  leadIcon?: IconifyIcon

  // The text to be displayed.
  text: string

  // The link to be navigated to when the item is clicked. When this
  // prop is set, the item is rendered via `<SLink>`.
  link?: string

  // The callback to be called when the item is clicked.
  onClick?(): void
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

```ts
import { type IconifyIcon } from '@iconify/vue/dist/offline'

interface ActionListItem {
  leadIcon?: IconifyIcon
  text: string
  link?: string
  onClick?(): void
}
```
