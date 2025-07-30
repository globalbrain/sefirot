<script setup lang="ts">
import SContent from 'sefirot/components/SContent.vue'
</script>

# SContent

`<SContent>` applies basic styles to a [supported list](#supported-elements) of native HTML elements.

<Showcase
  path="/components/SContent.vue"
  story="/stories-components-scontent-01-playground-story-vue"
>
  <SContent>
    <h2>Title of the section</h2>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
    <ul>
      <li>Excepteur sint occaecat cupidatat.</li>
      <li>Voluptate velit esse cillum dolore.</li>
      <li>Labore et dolore magna aliqua.</li>
    </ul>
  </SContent>
</Showcase>

## Import

```ts
import SContent from '@globalbrain/sefirot/lib/components/SContent.vue'
```

## Usage

Place HTML elements inside `<SContent>` component and it will apply basic styles to the element, including spacing between elements.

```vue-html
<template>
  <SContent>
    <h2>Title of the section</h2>
    <p>Lorem ipsum dolor sit amet.</p>
    <p>Consectetur adipiscing elit.</p>
    <ul>
      <li>Excepteur sint occaecat cupidatat.</li>
      <li>Voluptate velit esse cillum dolore.</li>
      <li>Labore et dolore magna aliqua.</li>
    </ul>
  </SContent>
</template>
```

### Supported elements

The following elements are supported:

- `<h1>`
- `<h2>`
- `<h3>`
- `<p>`
- `<strong>`
- `<a>`
- `<ul>`
- `<ol>`
- `<table>`

### Heading styles

You may use either the `h1` or `h2` class to apply the respective heading styles to the element. For example, you may want to use `h1` class to style the element as a heading.

```vue-html
<SContent>
  <p class="h1">Title text</p>
</SContent>
```
