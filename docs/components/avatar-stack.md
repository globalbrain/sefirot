<script setup lang="ts">
import SAvatarStack from 'sefirot/components/SAvatarStack.vue'

const avatars = [
  { image: 'https://i.pravatar.cc/144?img=1' },
  { image: 'https://i.pravatar.cc/144?img=2' },
  { image: 'https://i.pravatar.cc/144?img=3' },
  { image: 'https://i.pravatar.cc/144?img=4' }
]
</script>

# SAvatarStack

The `SAvatarStack` component is used to display a stack of avatars. It is useful when you want to display a list of users or avatars in a single component.

<Showcase
  path="/components/SAvatarStack.vue"
  story="/stories-components-savatarstack-01-playground-story-vue"
>
  <div class="flex flex-wrap gap-16">
    <SAvatarStack :avatars />
  </div>
</Showcase>

## Usage

Import `<SAvatarStack>` component and pass in an array of avatars.

```vue
<script setup lang="ts">
import SAvatarStack from '@globalbrain/sefirot/lib/components/SAvatarStack.vue'

const avatars = [
  { image: '/path/to/image-1.jpg' },
  { image: '/path/to/image-2.jpg' },
  { image: '/path/to/image-3.jpg' }
]
</script>

<template>
  <SAvatarStack :avatars />
</template>
```

## Props

Here are the list of props you may pass to the component.

### `:avatars`

An array of avatars to display.

```ts
interface Props {
  avatars: { image?: string; name?: string }[]
}
```

```vue-html
<SAvatarStack
  :avatars="[
    { image: '/path/to/image-1.jpg' },
    { image: '/path/to/image-2.jpg' }
  ]"
/>
```

If you want to display initials instead of images, you can pass an array of objects with the `name` property.

```vue-html
<SAvatarStack
  :avatars="[
    { name: 'Jane Doe' },
    { name: 'Richard Roe' }
  ]"
/>
```

### `:size`

Defines the size of the component. The default is `medium`.

```ts
interface Props {
  size?: 'nano' | 'mini' | 'small' | 'medium' | 'large' | 'jumbo'
}
```

```vue-html
<SAvatarStack
  size="medium"
  :avatars="[
    { image: '/path/to/image-1.jpg' },
    { image: '/path/to/image-2.jpg' }
  ]"
/>
```

### `:avatar-count`

The maximum number of avatars to display. The default is `2`. Set to `0` to display all avatars. If the number of avatars is greater than the `avatar-count`, the component will display the number of avatars and a `+X` label where `X` is the number of avatars that are not displayed.

```ts
interface Props {
  avatarCount?: number
}
```

```vue-html
<SAvatarStack
  :avatar-count="2"
  :avatars="[
    { image: '/path/to/image-1.jpg' },
    { image: '/path/to/image-2.jpg' }
  ]"
/>
```

### `:tooltip`

Whether to display a tooltip when hovering over the component. You can also pass an object with the `position` property to define the position of the tooltip. The default position is `top`. The tooltip will display the name of the user if provided.

```ts
interface Props {
  tooltip?: boolean | { position?: 'top' | 'right' | 'bottom' | 'left' }
}
```

```vue-html
<SAvatarStack
  tooltip
  :avatars="[
    { image: '/path/to/image-1.jpg', name: 'Jane Doe' },
    { image: '/path/to/image-2.jpg', name: 'Richard Roe' }
  ]"
/>
```
