# Image

`Image` composable module provides helper functions to handle image related operations.

## `useImageSrcFromFile`

Get renderable image src from the given file. If a string is given, it will be returned as is. It is useful when you want to render an image from a remote URL.

```ts
import { type MaybeRefOrGetter } from 'vue'

interface ImageSrcFromFile {
  src: Ref<string | null>
}

function useImageSrcFromFile(
  file: MaybeRefOrGetter<File | string | null>
): ImageSrcFromFile
```

```vue
<script setup lang="ts">
import { useImageSrcFromFile } from '@globalbrain/sefirot/lib/composables/Image'

const { src } = useImageSrcFromFile(file)
</script>

<template>
  <img :src="src">
</template>
```
