<script setup lang="ts">
import SIndicator from 'sefirot/components/SIndicator.vue'

const states = ['pending', 'ready', 'queued', 'running', 'completed', 'failed'] as const
</script>

# SIndicator

`<SIndicator>` is used to display status or progress of an item or a task.

<Showcase
  path="/components/SIndicator.vue"
  story="/stories-components-sindicator-01-playground-story-vue"
>
  <div class="flex flex-wrap gap-16">
    <SIndicator v-for="s in states" :key="s" size="mini" :state="s" />
  </div>
</Showcase>

## Usage

Import `<SIndicator>` component and define its state.

```vue
<script setup lang="ts">
import SIndicator from '@globalbrain/sefirot/lib/components/SIndicator.vue'
</script>

<template>
  <SIndicator state="running" />
</template>
```

## Props

Here are the list of props you may pass to the component.


### `:state`

The state of the indicator.

```ts
interface Props {
  state: State
}

type State =
  | 'pending'
  | 'ready'
  | 'queued'
  | 'running'
  | 'completed'
  | 'failed'
```

```vue-html
<SIndicator state="completed" />
```

### `:size`

The size of the indicator. The default is `'medium'`.

```ts
interface Props {
  size?: Size
}

type Size =
  | 'nano'
  | 'mini'
  | 'small'
  | 'medium'
  | 'large'
  | 'jumbo'
```

```vue-html
<SIndicator size="small" state="..." />
```

### `:mode`

Whether the indicator should have colors or be monochrome. The default is `'colored'`.

```ts
interface Props {
  mode?: Mode
}

type Mode =
  | 'colored'
  | 'monochrome'
```

```vue-html
<SIndicator mode="monochrome" state="..." />
```
