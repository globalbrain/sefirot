<script setup lang="ts">
import SAvatar from 'sefirot/components/SAvatar.vue'
</script>

# SAvatar

`<SAvatar>` is a common avatar displaying component.

<Showcase
  path="/components/SAvatar.vue"
  story="avatar-01-playground"
>
  <div class="flex flex-wrap gap-16">
    <SAvatar avatar="https://github.com/kiaking.png" />
    <SAvatar avatar="https://github.com/ryo-gk.png" />
    <SAvatar avatar="https://github.com/NozomuIkuta.png" />
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

### `:size`

Defines the size of the component. The default is `medium`.

```ts
interface Props {
  size?: 'nano' | 'mini' | 'small' | 'medium' | 'large' | 'jumbo'
}
```

```vue-html
<SAvatar size="medium" image="/image.jpg" />
```

### `:avatar`

The path to the image. 

```ts
interface Props {
  avatar?: string | null
}
```

```vue-html
<SAvatar image="/image.jpg" />
```

### `:name`

The name of the avatar user. The initial value of the name gets displayed. When `avatar` prop is set, this value gets ignored.

```ts
interface Props {
  name?: string | null
}
```

```vue-html
<SAvatar name="John Doe" />
```

### `:tooltip`

When set to `true`, a tooltip showing the name will be displayed when hovering over the avatar. You can also pass an object to define the position of the tooltip.

```ts
interface Props {
  tooltip?: boolean | { position?: 'top' | 'right' | 'bottom' | 'left' }
}
```

```vue-html
<SAvatar tooltip name="John Doe" />
```
