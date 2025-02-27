<script setup lang="ts">
import SIndicator from 'sefirot/components/SIndicator.vue'

const states = ['pending', 'ready', 'queued', 'running', 'completed', 'failed'] as const
</script>

# SIndicator

`<SIndicator>` is used to display status or progress of an item or a task.

<Showcase
  path="/components/SIndicator.vue"
  story="indicator-01-playground"
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

```ts
interface Props {
  size?: Size
  state: State
  mode?: Mode
}

type Size =
  | 'nano'
  | 'mini'
  | 'small'
  | 'medium'
  | 'large'
  | 'jumbo'

type State =
  | 'pending'
  | 'ready'
  | 'queued'
  | 'running'
  | 'completed'
  | 'failed'

type Mode =
  | 'colored'
  | 'monochrome'
```

### `:size`

The size of the indicator. The default is `medium`.

```ts
interface Props {
  size?: Size
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

### `:state`

The state of the indicator.

```ts
interface Props {
  mode?: 
}

type Size =
  | 'mini'
  | 'small'
  | 'medium'
  | 'large'
  | 'jumbo'
```

```vue-html
<SIndicator state="completed" />
```

### `:mode`

Whether the indicator should have colors or be monochrome. The default is `colored`.

```ts
interface Props {
  mode?: Mode
}

type Mode =
  | 'colored'
  | 'monochrome'
```

```vue-html
<SIndicator mode="monochrome" state="running" />
```
