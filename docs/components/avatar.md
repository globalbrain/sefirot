<script setup lang="ts">
import SAvatar from 'sefirot/components/SAvatar.vue'
</script>

# SAvatar

`<SAvatar>` is a common avatar displaying component.

<Showcase
  path="/components/SAvatar.vue"
  story="/stories-components-savatar-01-playground-story-vue"
>
  <div class="flex flex-wrap gap-16">
    <SAvatar avatar="https://avatars.githubusercontent.com/u/3753672?v=4" />
    <SAvatar avatar="https://avatars.githubusercontent.com/u/62658104?v=4" />
    <SAvatar avatar="https://avatars.githubusercontent.com/u/16436160?v=4" />
    <SAvatar name="John Doe" />
    <SAvatar name="Anna Green" />
    <SAvatar name="George Walsh" />
  </div>
</Showcase>

## Usage

Import `<SAvatar>` component and pass in either the image or a name. When the image is passed, the image gets displayed, and when passing a name, the initial of the name will be used.

```vue
<script setup lang="ts">
import SAvatar from '@globalbrain/sefirot/lib/components/SAvatar.vue'
</script>

<template>
  <SAvatar avatar="/path/to/image.jpg" />
  <SAvatar name="John Doe" />
</template>
```

## Props

Here are the list of props you may pass to the component.

### `size`

Defines the size of the component. The default is `medium`.

```ts
interface Props {
  size?: 'nano' | 'mini' | 'small' | 'medium' | 'large'
}
```

```vue-html
<SAvatar size="medium" image="/image.jpg" />
```

### `avatar`

The path to the image. 

```ts
interface Props {
  avatar?: string | null
}
```

```vue-html
<SAvatar image="/image.jpg" />
```

### `name`

The name of the avatar user. The initial value of the name gets displayed. When `avatar` prop is set, this value gets ignored.

```ts
interface Props {
  name?: string | null
}
```

```vue-html
<SAvatar name="John Doe" />
```
