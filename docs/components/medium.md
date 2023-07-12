<script setup lang="ts">
import SMedium from 'sefirot/components/SMedium.vue'
</script>

# SMedium

`<SMedium>` applies basic styles to the native HTML elements.

<Showcase
  path="/components/SMedium.vue"
  story="/stories-components-smedium-01-playground-story-vue"
>
  <SMedium>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
    <ul>
      <li>Excepteur sint occaecat cupidatat.</li>
      <li>Voluptate velit esse cillum dolore.</li>
      <li>Labore et dolore magna aliqua.</li>
    </ul>
  </SMedium>
</Showcase>

## Usage

Place HTML elements inside `<SMedium>` component and it will apply basic styles to the element, including spacing between elements.

```vue
<script setup lang="ts">
import SMedium from '@globalbrain/sefirot/lib/components/SMedium.vue'
</script>

<template>
  <SMedium>
    <p>Lorem ipsum dolor sit amet.</p>
    <p>Consectetur adipiscing elit.</p>
    <ul>
      <li>Excepteur sint occaecat cupidatat.</li>
      <li>Voluptate velit esse cillum dolore.</li>
      <li>Labore et dolore magna aliqua.</li>
    </ul>
  </SMedium>
</template>
```

The supported elements are:

- `<p>`
- `<strong>`
- `<a>`
- `<ul>`
- `<ol>`
- `<li>`
