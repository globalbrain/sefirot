<script setup lang="ts">
import SButton from 'sefirot/components/SButton.vue'
import SButtonGroup from 'sefirot/components/SButtonGroup.vue'
</script>

# SButtonGroup

`<SButtonGroup>` is a component that groups multiple buttons together.

<Showcase
  path="/components/SButtonGroup.vue"
  story="/stories-components-sbuttongroup-01-playground-story-vue"
>
  <SButtonGroup>
    <SButton mode="mute" label="Left" />
    <SButton mode="mute" label="Middle" />
    <SButton mode="mute" label="Right" />
  </SButtonGroup>
</Showcase>

## Usage

Wrap `<SButton>` with `<SButtonGroup>` component. Currently, it does not support button types other than `:type="fill"`. If you pass buttons of other types, the style may appear corrupted.

```vue
<script setup lang="ts">
import SButton from '@globalbrain/sefirot/lib/components/SButton.vue'
import SButtonGroup from '@globalbrain/sefirot/lib/components/SButtonGroup.vue'
</script>

<template>
  <SButtonGroup>
    <SButton mode="mute" label="Left" />
    <SButton mode="mute" label="Middle" />
    <SButton mode="mute" label="Right" />
  </SButtonGroup>
</template>
```

## Slots

Here are the list of slots you may define within the component.

### `#default`

You may pass in any number of `<SButton>` components. The component will group them together.

```vue
<script setup lang="ts">
import SButton from '@globalbrain/sefirot/lib/components/SButton.vue'
import SButtonGroup from '@globalbrain/sefirot/lib/components/SButtonGroup.vue'
</script>

<template>
  <SButtonGroup>
    <SButton mode="mute" label="Left" />
    <SButton mode="mute" label="Middle" />
    <SButton mode="mute" label="Right" />
  </SButtonGroup>
</template>
```
