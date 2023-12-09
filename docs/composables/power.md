# Power <Badge text="3.10.0" />

`Power` module provides a composable to work with modal state.

## `usePower`

```ts
interface Power {
  /**
   * the modal state.
   */
  state: Ref<boolean>
  /**
   * shows the modal.
   */
  on(fn?: () => void): boolean
  onAfter(fn: () => Promise<any>): Promise<boolean>
  /**
   * hides the modal.
   */
  off(fn?: () => void): boolean
  offAfter(fn: () => Promise<any>): Promise<boolean>
  /**
   * toggles the modal state.
   */
  toggle(fn?: () => void): boolean
  toggleAfter(fn: () => Promise<any>): Promise<boolean>
}
```

```vue
<script setup lang="ts">
import SButton from '@globalbrain/sefirot/lib/components/Button.vue'
import SModal from '@globalbrain/sefirot/lib/components/Modal.vue'
import { usePower } from '@globalbrain/sefirot/lib/composables/Power'

const { state, on, off } = usePower()
</script>

<template>
  <SButton mode="info" label="Open dialog" @click="on" />
  <SModal :open="state" @close="off">
    <p>Modal content</p>
  </SModal>
</template>
```

You can also pass a function to `on`, `off` and `toggle` methods.

```vue
<script setup lang="ts">
import SButton from '@globalbrain/sefirot/lib/components/Button.vue'
import SModal from '@globalbrain/sefirot/lib/components/Modal.vue'
import { usePower } from '@globalbrain/sefirot/lib/composables/Power'

const { state, on, off } = usePower()
</script>

<template>
  <SButton mode="info" label="Open dialog" @click="on(() => console.log('opened'))" />
  <SModal :open="state" @close="off(() => console.log('closed'))">
    <p>Modal content</p>
  </SModal>
</template>
```
