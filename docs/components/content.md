<script setup lang="ts">
import SContent from 'sefirot/components/SContent.vue'
</script>

# SContent

`<SContent>` applies basic styles to the native HTML elements.

<Showcase
  path="/components/SContent.vue"
  story="content-01-playground"
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

The supported elements are:

- `<h1>`
- `<h2>`
- `<h3>`
- `<p>`
- `<strong>`
- `<a>`
- `<ul>`
- `<ol>`
- `<table>`

### Use CSS class to style the headings

You may use css class either `h1` or `h2` to apply the styles to the element.

```vue-html
<SContent>
  <p class="h1">Title text</p>
</SContent>
```
