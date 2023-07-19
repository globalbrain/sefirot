<script setup lang="ts">
import SContent from 'sefirot/components/SContent.vue'
</script>

# SContent

`<SContent>` applies basic styles to the native HTML elements.

<Showcase
  path="/components/SContent.vue"
  story="/stories-components-scontent-01-playground-story-vue"
>
  <SContent>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
    <ul>
      <li>Excepteur sint occaecat cupidatat.</li>
      <li>Voluptate velit esse cillum dolore.</li>
      <li>Labore et dolore magna aliqua.</li>
    </ul>
  </SContent>
</Showcase>

## Usage

Place HTML elements inside `<SContent>` component and it will apply basic styles to the element, including spacing between elements.

```vue
<script setup lang="ts">
import SContent from '@globalbrain/sefirot/lib/components/SContent.vue'
</script>

<template>
  <SContent>
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

- `<p>`
- `<strong>`
- `<a>`
- `<ul>`
- `<ol>`
- `<li>`
