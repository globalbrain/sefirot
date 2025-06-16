# SLocalNav

`<SLocalNav>` determines the top level navigation for a specific page.

## Import

```ts
import SLocalNav from '@globalbrain/sefirot/lib/components/SLocalNav.vue'
```

## Usage

The only required props is `:title`. The most basic local nav that contains only the title can be defined as follows.

The `:title` prop accepts array of title object. This is because title could have link, and also it can be a breadcrumb as shown at later section.

```vue
<script setup lang="ts">
const title = [
  { text: 'Page title' }
]
</script>

<template>
  <SLocalNav :title />
</template>
```

### Page breadcrumbs

You may pass multiple title objects as an array to `:title` prop to render breadcrumbs. Usually, except for the latest one, each title object should have `link` set.

```vue
<script setup lang="ts">
const title = [
  { text: 'Parent page', link: '/parent' },
  { text: 'Current page' }
]
</script>

<template>
  <SLocalNav :title />
</template>
```

### Page actions

You may define `:actions` to display page actions (buttons). The `:actions` prop accepts array of [`Action`](#action) object. The action object is the same as props for [`<SButton>`](button) except `:size` since the size is fixed to `small`, and an extra `onClick` function to handle the click event.

```vue
<script setup lang="ts">
const title = [
  { text: 'Page title' },
]

const actions = [
  { label: 'Edit title', onClick: () => { /* ... */ } },
  { label: 'About', onClick: () => { /* ... */ } }
]
</script>

<template>
  <SLocalNav :title :actions />
</template>
```

### Page navigation

You may define `:menu` to display a page navigation. The `:menu` props accepts "double nested" array, in order to create grouping of menu items.

```vue
<script setup lang="ts">
const title = [
  { text: 'Page title' },
]

const menu = [
  [
    { text: 'Menu item 1', link: '/menu1' },
    { text: 'Menu item 2', link: '/menu2' },
  ],
  [
    { text: 'Menu item 3', link: '/menu3' },
    { text: 'Menu item 4', link: '/menu4' },
  ],
]
</script>

<template>
  <SLocalNav :title :menu />
</template>
```

## Types

### `Avatar`

The type of the `:avatar` prop.

```ts
interface Avatar {
  image?: string | null
  name?: string | null
}
```

### `Title`

The type of the `:title` prop.

```ts
interface Title {
  text: string
  link?: string
}
```

### `Action`

```ts
import { type Component } from 'vue'
import { type Mode, type Tooltip, type Type } from '@globalbrain/sefirot/lib/components/SButton.vue'

export interface Action {
  tag?: string | Component  type?: Type
  mode?: Mode
  icon?: Component
  leadIcon?: Component
  trailIcon?: Component
  iconMode?: Mode
  label?: string
  labelMode?: Mode
  href?: string
  loading?: boolean
  disabled?: boolean
  tooltip?: string | Tooltip
  onClick?(): void
}
```

### `MenuItem`

The type of menu item.

```ts
interface MenuItem {
  icon?: Component
  text: string
  link: string
  active?: boolean
}
```

## Props

```ts
interface Props {
  avatar?: Avatar
  title: Title[]
  description?: string
  actions?: Action[]
  menu?: MenuItem[][]
}
```

### `:avatar`

Add avatar image to the local nav.

```ts
interface Props {
  avatar?: Avatar
}
```

```vue-html
<SLocalNav :title="[{ text: 'Page title' }]" />
```

### `:title`

The title of the page.

```ts
interface Props {
  title: Title[]
}
```

```vue-html
<SLocalNav
  :avatar="{ image: 'path/to/image.jpg', name: 'John Doe' }"
  :title="[{ text: 'Page title' }]"
/>
```

### `:description`

Add description text under the title.

```ts
interface Props {
  description?: string
}
```

```vue-html
<SLocalNav
  :title="[{ text: 'Page title' }]"
  description="Lorem ipsum..."
/>
```

### `:actions`

The actions of the page.

```ts
interface Props {
  actions: Action[]
}
```

```vue-html
<SLocalNav
  :title="[{ text: 'Page title' }]"
  :actions="[
    { label: 'Edit title' },
    { label: 'About' }
  ]"
/>
```

### `:menu`

The menu of the page.

```ts
interface Props {
  menu: MenuItem[][]
}
```

```vue-html
<SLocalNav
  :title="[{ text: 'Page title' }]"
  :menu="[[
    { text: 'Menu item 1', link: '/menu1' },
    { text: 'Menu item 2', link: '/menu2' }
  ]]"
/>
```
