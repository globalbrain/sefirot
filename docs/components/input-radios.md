<script setup lang="ts">
import { ref } from 'vue'
import SInputRadios from 'sefirot/components/SInputRadios.vue'

const input = ref(1)

const options = [
  { label: 'Item 001', value: 1 },
  { label: 'Item 002', value: 2 },
  { label: 'Item 003', value: 3 }
]
</script>

# SInputRadios

`<SInputRadios>` is a radio button input component.

<Showcase
  path="/components/SInputRadios.vue"
  story="/stories-components-sinputradios-01-playground-story-vue"
>
  <SInputRadios :options="options" v-model="input" />
</Showcase>

## Usage

Import `<SInputRadios>` component and pass in `options` and `value` props.

```vue
<script setup lang="ts">
import { ref } from 'vue'
import SInputRadios from '@globalbrain/sefirot/lib/components/SInputRadios.vue'

const input = ref(1)

const options = [
  { label: 'Item 001', value: 1 },
  { label: 'Item 002', value: 2 },
  { label: 'Item 003', value: 3 }
]
</script>

<template>
  <SInputRadios :options="options" v-model="input" />
</template>
```

## Props

Here are the list of props you may pass to the component.

### `size`

Defines the size of the input. The default is `small`.

```ts
interface Props {
  size?: 'mini' | 'small' | 'medium'
}
```

```vue
<SInputRadios
  size="small"
  :options="[...]"
  v-model="..."
/>
```

### `label`

Defines the label text of the input.

```ts
interface Props {
  label?: string
}
```

```vue
<SInputRadios
  label="Name"
  :options="[...]"
  v-model="..."
/>
```

### `note`

Adds small help text after the label. Best used along with `label` prop.

```ts
interface Props {
  note?: string
}
```

```vue
<SInputRadios
  label="Company URL"
  note="Optional"
  :options="[...]"
  v-model="..."
/>
```

### `options`

The list of selectable options for the input.

```ts
interface Props {
  options?: Option[]
}

export interface Option {
  label: string
  value: string | number | boolean
}
```

```vue
<SInputRadios
  :options="[
    { label: 'Item 001', value: 1 },
    { label: 'Item 002', value: 2 },
    { label: 'Item 003', value: 3 }
  ]"
  v-model="..."
/>
```

### `nullable`

Enables the user to deselect options. The default is `false`.

```ts
interface Props {
  nullable?: boolean
}
```

```vue
<SInputRadios
  :options="[...]"
  nullable
  v-model="..."
/>
```

### `value`

Sets the input value. When `model-value` prop is set (e.g. via `v-model` directive), this prop gets ignored.

```ts
interface Props {
  value?: string | number | boolean | null
}
```

```vue
<SInputRadios
  :options="[...]"
  :value="1"
/>
```

### `model-value`

The `v-model` binding for the input.

```ts
interface Props {
  modelValue?: string | number | boolean | null
}
```

```vue
<SInputRadios
  :options="[...]"
  v-model="1"
/>
```

### `validation`

The validation object for the input. It accepts [Vuelidate](https://vuelidate-next.netlify.app/) like validation opject and displays error if there're any.

```ts
import { ErrorObject } from '@vuelidate/core'

interface Props {
  validation?: Validatable
}

interface Validatable {
  readonly $dirty: boolean
  readonly $errors: ErrorObject[]
  readonly $invalid: boolean
  readonly $touch: () => void
}
```

```vue
<SInputRadios
  :options="[...]"
  v-model="1"
  :validation="validation"
/>
```

### `hide-error`

Stop showing validation error message even when there are errors. This prop will not prevent the error color from appearing.

```ts
interface Props {
  hideError?: boolean
}
```

```vue
<SInputRadios
  :options="[...]"
  v-model="1"
  :validation="validation"
  hide-error
/>
```

## Events

Here are the list of events the component may emit.

### `update:model-value`

Emits when the user selects the item. This event is always emitted together with `change` event.

```ts
interface Emits {
  (e: 'update:model-value', value: Value): void
}

type Value = string | number | boolean | null
```

### `change`

Emits when the user selects the item. This event is always emitted together with `update:model-value` event.

```ts
interface Emits {
  (e: 'change', value: Value): void
}

type Value = string | number | boolean | null
```

## Styles

You may customize the styles by overriding `--input` prefixed CSS variables.

### Global input styles

You may customize the various styles of the component via global input related CSS variables. Please refer to [Styles: Input Styles](../styles/input-styles) page.
