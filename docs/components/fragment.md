# SFragment

`<SFragment>` is a utility component that allows you to wrap some component with another component based on conditions.

## Usage

Import `<SFragment>` component and wrap it around with other component. Specify `:is` prop to define the component to be used. When `:is` prop is not defined, it will render the underlining component directly.

This component is useful in a case for example you want to wrap some component with `<STooltip>` only when some props are passed.

```vue
<script setup lang="ts">
import { ref } from 'vue'
import SButton from '@globalbrain/sefirot/lib/components/SButton.vue'
import STooltip from '@globalbrain/sefirot/lib/components/STooltip.vue'
import SButton from '@globalbrain/sefirot/lib/components/SFragment.vue'

const tooltip = ref('')
</script>

<template>
  <!--
    Wrap component with `<STooltip>` only when tooltip ref
    is set. Otherwise, it will render `<SButton>` directly.
  -->
  <SFragment :is="tooltip && STooltip" :text="tooltip">
    <SButton label="Button" />
  </SFragment>
</template>
```

Note that `<SFragment>` will forward all props to a given component, for example in the above case `:text` is forwarded on to `<STooltip>`.

## Props

Here are the list of props you may pass to the component.

### `:is`

The component to be used to wrap the children. When this prop is not defined, it will render the children directly.

```ts
interface Props {
  is?: any
}
```

```vue-html
<SFragment :is="STooltip">
  ...
</SFragment>
```
