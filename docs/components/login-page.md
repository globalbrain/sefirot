# SLoginPage

`<SLoginPage>` is the component to render login page.

## Usage

You may use `<SLoginPage>` only for login page.

```vue
<script setup lang="ts">
import SLoginPage from '@globalbrain/sefirot/lib/components/SLoginPage.vue'
</script>

<template>
  <SLoginPage />
</template>
```

## Props

Here are the list of props you may pass to the component.

### `:cover`

This prop is the URL of cover image, which is used as background image.

```ts
interface Props {
  cover: string
}
```

### `:coverTitle`

This prop is an object whose `text` is the title of the cover image and `link` is its link.

```ts
interface CoverTitle {
  text: string
  link: string
}
```

### `:coverPhotographer`

This prop is an object whose `text` is the name of photographer of the cover image and `link` is its link.

```ts
interface CoverPhotographer {
  text: string
  link: string
}
```

### `:actions`

This prop is an array of login buttons,
where `type` is auth provider, `label` is to override default label, and `onClick` is a function to log in.

```ts
interface Action {
  type: 'google'
  label?: string
  onClick: () => Promise<void>
}
```
