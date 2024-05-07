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
  <SLocalNav :title="title" />
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
  <SLocalNav :title="title" />
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
  <SLocalNav :title="title" :menu="menu" />
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

### `MenuItem`

The type of menu item.

```ts
import { type IconifyIcon } from '@iconify/vue/dist/offline'

interface MenuItem {
  icon?: IconifyIcon
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

### `description`

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
  :menu="[
    { text: 'Menu item 1', link: '/menu1' },
    { text: 'Menu item 2', link: '/menu2' }
  ]"
/>
```
