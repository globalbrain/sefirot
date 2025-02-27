<script setup lang="ts">
import SState from 'sefirot/components/SState.vue'

const modes = ['default', 'neutral', 'info', 'success', 'warning', 'danger'] as const
</script>

# SState

`<SState>` is a badge that indicates the state of the object.

<Showcase
  path="/components/SState.vue"
  story="state-01-playground"
>
  <div class="flex flex-wrap gap-12">
    <SState v-for="m in modes" :key="m" :mode="m" label="State" />
  </div>
</Showcase>

## Overview

Use this component to indicate the state of the object. For example, `<SState>` can be used to note certain object's status, such as "Open", "In progress", "Completed", etc.

### Difference from `<SPill>`

The `<SState>` is different from [`<SPill>`](pill) where `<SPill>` should be used to list certain types of items for the object, but `<SState>` is used to indicate the "State" of the object.

For example, `<SState>` should be used for things like "Status" (Open, In progress, Completed, etc.).

`<SPill>` on the other hand should be used for things like "Tag" (List of available items, User's roles, etc.)

## Import

```ts
import SState from '@globalbrain/sefirot/lib/components/SState.vue'
```

## Usage

Import `<SState>` component and set `:mode` and `:label`.

```vue-html
<SState mode="success" label="Completed" />
```

## Props

### `:as`

Defines the HTML tag for the pill. Any value passed to this prop will used as `<component :is="as">`.

```ts
interface Props {
  // @default 'span'
  as?: string
}
```

```vue-html
<SState as="div" label="State" />
```

### `:size`

Defines the size of the component.

```ts
interface Props {
  // @default 'small'
  size?: 'mini' | 'small' | 'medium' | 'large'
}
```

```vue-html
<SState size="small" label="State" />
```

### `:mode`

Defines the color of the state.

```ts
interface Props {
  // @default 'default'
  mode?: Mode
}

type Mode =
  | 'default'
  | 'mute'
  | 'neutral'
  | 'info'
  | 'success'
  | 'warning'
  | 'danger'
```

```vue-html
<SState mode="neutral" label="State" />
```

### `:label`

Defines the label text of the state.

```ts
interface Props {
  label: string
}
```

```vue-html
<SState label="State" />
```
