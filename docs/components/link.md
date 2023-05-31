# SLink

`<SLink>` is a style less component that renders an anchor tag with custom utility options.

## Usage

You may use `<SLink>` as almost same as `<a>` tag. Wrap text with it and it will render an anchor tag with the text inside.

```vue
<script setup lang="ts">
import SLink from '@globalbrain/sefirot/lib/components/SLink.vue'
</script>

<template>
  <SLink href="https://example.com">
    Link text
  </SLink>
</template>
```

`<SLink>` will automatically add `target="_blank"` and `rel="noopener noreferrer"` to the anchor tag if the `href` prop is an external link. If the link is internal, it will use `<RouterLink>` component from Vue Router instead.

```vue-html
<SLink href="https://example.com">
<!-- Becomes -->
<a href="https://example.com" target="_blank" rel="noopener noreferrer">

<SLink href="/about">
<!-- Becomes -->
<RouterLink to="/about">
```

You may pass `:external` prop to override this behavior. For example, if you would like to have internal link open in another tab, set `:external` to `true`.

```vue-html
<SLink href="/about" external>
<!-- Becomes -->
<a href="/about" target="_blank" rel="noopener noreferrer">
```

## Props

Here are the list of props you may pass to the component.

### `:href`

The link to be used. If the link is external, it will automatically add `target="_blank"` and `rel="noopener noreferrer"` to the anchor tag.

```ts
interface Props {
  href?: string
}
```

```vue-html
<SLink href="/about">...</SLink>
```

### `:external`

Override the automatic external link detection. If set to `true`, it will always add `target="_blank"` and `rel="noopener noreferrer"` to the anchor tag.

```ts
interface Props {
  external?: boolean
}
```

```vue-html
<SLink href="/about" external>...</SLink>
```
