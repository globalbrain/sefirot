<script setup lang="ts">
import { ref } from 'vue'
import SInputCheckboxes from 'sefirot/components/SInputCheckboxes.vue'

const input = ref([])

const options = [
  { label: 'Item 001', value: 1 },
  { label: 'Item 002', value: 2 },
  { label: 'Item 003', value: 3 }
]
</script>

# SInputCheckboxes

`<SInputCheckboxes>` is a multiple checkboxes input component.

<Showcase
  path="/components/SInputCheckboxes.vue"
  story="/stories-components-sinputcheckboxes-01-playground-story-vue"
>
  <SInputCheckboxes :options v-model="input" />
</Showcase>

## Usage

Import `<SInputCheckboxes>` component and pass in `:options` and `:value` props.

```vue
<script setup lang="ts">
import { ref } from 'vue'
import SInputCheckboxes from '@globalbrain/sefirot/lib/components/SInputCheckboxes.vue'

const input = ref([])

const options = [
  { label: 'Item 001', value: 1 },
  { label: 'Item 002', value: 2 },
  { label: 'Item 003', value: 3 }
]
</script>

<template>
  <SInputCheckboxes :options v-model="input" />
</template>
```

## Props

Here are the list of props you may pass to the component.

### `:size`

Defines the size of the input. The default is `'small'`.

```ts
interface Props {
  size?: 'mini' | 'small' | 'medium'
}
```

```vue-html
<SInputCheckboxes
  size="small"
  :options="[...]"
  v-model="..."
/>
```

### `:label`

Defines the label text of the input.

```ts
interface Props {
  label?: string
}
```

```vue-html
<SInputCheckboxes
  label="Name"
  :options="[...]"
  v-model="..."
/>
```

### `:info`

Shows help icon after the label and shows info in a tooltip when the user hovers the label.

```ts
interface Props {
  info?: string
}
```

```vue-html
<SInputCheckboxes
  label="Domain"
  info="Some helpful information."
  :options="[...]"
  v-model="..."
/>
```

### `:note`

Adds small help text after the label. Best used along with `:label`.

```ts
interface Props {
  note?: string
}
```

```vue-html
<SInputCheckboxes
  label="Domain"
  note="Optional"
  :options="[...]"
  v-model="..."
/>
```

### `:check-icon`

Icon to display at corner right of label. Useful to show the status of a particular input.

```ts
interface Props {
  checkIcon?: Component
}
```

```vue-html
<SInputCheckboxes :check-icon="IconCheckCircle" />
```

### `:check-text`

Text to display alongside `:check-icon`.

```ts
interface Props {
  checkText?: string
}
```

```vue-html
<SInputCheckboxes
  :check-text="Saved"
  :options="[...]"
  v-model="..."
/>
```

### `:check-color`

Defines the color of `:check-icon` and `:check-text`. The default is `'neutral'`.

```ts
interface Props {
  checkColor?: Color
}

type Color =
  | 'neutral' 
  | 'mute' 
  | 'info' 
  | 'success' 
  | 'warning' 
  | 'danger'
```

```vue-html
<SInputCheckboxes
  :check-icon="IconCheckCircle"
  check-text="Uploaded"
  check-color="success"
  :options="[...]"
  v-model="..."
/>
```

### `:options`

The list of selectable options for the input.

```ts
interface Props {
  options?: Option[]
}

export interface Option {
  label: string
  value: string | number | boolean
  disabled?: boolean
}
```

```vue-html
<SInputCheckboxes
  :options="[
    { label: 'Item 001', value: 1 },
    { label: 'Item 002', value: 2 },
    { label: 'Item 003', value: 3 }
  ]"
  v-model="..."
/>
```

### `:nullable`

Enables the user to deselect options. The default is `true`.

```ts
interface Props {
  nullable?: boolean
}
```

```vue-html
<SInputCheckboxes
  :options="[...]"
  nullable
  v-model="..."
/>
```

### `:disabled`

Mark input as disabled. When this prop is set, users may not be able to focus the element nor trigger any events.

```ts
interface Props {
  disabled?: boolean
}
```

```vue-html
<SInputCheckboxes
  :options="[...]"
  disabled
  v-model="..."
/>
```

### `:value`

Sets the input value. When `:model-value` is set (e.g. via `v-model` directive), this prop is ignored.

```ts
interface Props {
  value?: (string | number | boolean)[]
}
```

```vue-html
<SInputCheckboxes
  :options="[...]"
  :value="[1]"
/>
```

### `:model-value`

The `v-model` binding for the input.

```ts
interface Props {
  modelValue?: (string | number | boolean)[]
}
```

```vue-html
<SInputCheckboxes
  :options="[...]"
  v-model="[1]"
/>
```

### `:validation`

The validation object for the input. It accepts [Vuelidate](https://vuelidate-next.netlify.app/) like validation object and displays error if there're any.

```ts
import { Ref } from 'vue'

interface Props {
  validation?: Validatable
}

interface Validatable {
  readonly $dirty: boolean
  readonly $invalid: boolean
  readonly $errors: ValidatableError[]
  readonly $touch: () => void
}

interface ValidatableError {
  readonly $message: string | Ref<string>
}
```

```vue-html
<SInputCheckboxes
  :options="[...]"
  v-model="..."
  :validation
/>
```

### `:hide-error`

Stop showing validation error message even when there are errors. This prop will not prevent the error color from appearing.

```ts
interface Props {
  hideError?: boolean
}
```

```vue-html
<SInputCheckboxes
  :options="[...]"
  v-model="..."
  :validation
  hide-error
/>
```

## Slots

Here are the list of slots you may define within the component.

### `#info` {#info-slot}

Same as `:info` prop. When both `:info` and this slot are defined, this slot will take precedence.

```vue-html
<SInputCheckboxes label="Domain" v-model="...">
  <template #info>
    Learn more about this field <SLink href="...">here</SLink>.
  </template>
</SInputCheckboxes>
```

## Events

Here are the list of events the component may emit.

### `@update:model-value`

Emits when the user selects the item. This event is always emitted together with the `@change` event.

```ts
interface Emits {
  (e: 'update:model-value', value: Value): void
}

type Value = (string | number | boolean)[]
```

### `@change`

Emits when the user selects the item. This event is always emitted together with the `@update:model-value` event.

```ts
interface Emits {
  (e: 'change', value: Value): void
}

type Value = (string | number | boolean)[]
```

## Styles

You may customize the styles by overriding `--input` prefixed CSS variables.

### Global input styles

You may customize the various styles of the component via global input related CSS variables. Please refer to [Styles: Input Styles](../styles/input-styles) page.
