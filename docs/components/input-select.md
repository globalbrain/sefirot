<script setup lang="ts">
import { ref } from 'vue'
import SInputSelect from 'sefirot/components/SInputSelect.vue'

const input = ref(null)

const options = [
  { label: 'Item 001', value: 1 },
  { label: 'Item 002', value: 2 },
  { label: 'Item 003', value: 3 }
]
</script>

# SInputSelect

`<SInputSelect>` is a select input component. It uses the native `select` element under the hood. If you need a richer dropdown dialog, consider using `SInputDropdown`.

<Showcase
  path="/components/SSInputSelect.vue"
  story="/stories-components-sinputselect-01-playground-story-vue"
>
  <SInputSelect :options nullable v-model="input" />
</Showcase>

## Usage

Import `<SInputSelect>` component and pass in `options` and `value` props.

```vue
<script setup lang="ts">
import { ref } from 'vue'
import SInputSelect from '@globalbrain/sefirot/lib/components/SInputSelect.vue'

const input = ref(null)

const options = [
  { label: 'Item 001', value: 1 },
  { label: 'Item 002', value: 2 },
  { label: 'Item 003', value: 3 }
]
</script>

<template>
  <SInputSelect :options v-model="input" />
</template>
```

## Props

Here are the list of props you may pass to the component.

### `:size`

Defines the size of the input. The default is `small`.

```ts
interface Props {
  size?: 'mini' | 'small' | 'medium'
}
```

```vue-html
<SInputSelect
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
<SInputSelect
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
<SInputSelect
  label="Country"
  info="Some helpful information."
  v-model="..."
/>
```

### `:note`

Adds small help text after the label. Best used along with `label` prop.

```ts
interface Props {
  note?: string
}
```

```vue-html
<SInputSelect
  label="Company URL"
  note="Optional"
  :options="[...]"
  v-model="..."
/>
```

### `:placeholder`

Defines the placeholder text to show when the value is empty. When `nullable` is set, and `placeholder` is not defined, it will defaults to `'Please select'`.

```ts
interface Props {
  placeholder?: string
}
```

```vue-html
<SInputSelect
  placeholder="Please select"
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
<SInputSelect :check-icon="IconCheckCircle" />
```

### `:check-text`

Text to display alongside `check-icon`.

```ts
interface Props {
  checkText?: string
}
```

```vue-html
<SInputSelect :check-text="Saved" />
```

### `:check-color`

Defines the color of `check-icon` and `check-text`. The default is `neutral`.

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
<SInputSelect
  :check-icon="IconCheckCircle"
  check-text="Uploaded"
  check-color="success"
/>
```

### `:options`

The list of selectable options for the input.

Each option may define `disabled` option. If an item is `disabled`, it will not show up in the dropdown list, but it can be shown as the selected item if the input value matches it.

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
<SInputSelect
  :options="[
    { label: 'Item 001', value: 1 },
    { label: 'Item 002', value: 2 },
    { label: 'Item 003', value: 3, disabled: true }
  ]"
  v-model="..."
/>
```

### `:nullable`

Enables an user to select `null` value option. The default is `false`. When this prop is set, the placeholder will be shown even if `placeholder` prop is not set in order to add `null` value option for users to select.

```ts
interface Props {
  nullable?: boolean
}
```

```vue-html
<SInputSelect
  :options="[...]"
  nullable
  v-model="..."
/>
```

### `:disabled`

Mark input as disabled. When this prop is set, users may not be able to focus the element not trigger any events.

```ts
interface Props {
  disabled?: boolean
}
```

```vue-html
<SInputSelect
  :options="[...]"
  disabled
  v-model="..."
/>
```

### `:value`

Sets the input value. When `model-value` prop is set (e.g. via `v-model` directive), this prop gets ignored.

```ts
interface Props {
  value?: string | number | boolean | null
}
```

```vue-html
<SInputSelect
  :options="[...]"
  :value="1"
/>
```

### `:model-value`

The `v-model` binding for the input.

```ts
interface Props {
  modelValue?: string | number | boolean | null
}
```

```vue-html
<SInputSelect
  :options="[...]"
  v-model="1"
/>
```

### `:validation`

The validation object for the input. It accepts [Vuelidate](https://vuelidate-next.netlify.app/) like validation object and displays error if there're any.

```ts
import { Ref } from 'vue'

interface Props {
  validation?: Validatable
}

export interface Validatable {
  readonly $dirty: boolean
  readonly $invalid: boolean
  readonly $errors: ValidatableError[]
  readonly $touch: () => void
}

export interface ValidatableError {
  readonly $message: string | Ref<string>
}
```

```vue-html
<SInputSelect
  :options="[...]"
  v-model="1"
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
<SInputSelect
  :options="[...]"
  v-model="1"
  :validation
  hide-error
/>
```

## Slots

Here are the list of slots you may define within the component.

### `#info` {#info-slot}

Same as `info` prop. When `info` prop and this slot are defined at the same time, this slot will take precedence.

```vue-html
<SInputSelect label="Country" v-model="...">
  <template #info>
    Learn more about this field <SLink href="...">here</SLink>.
  </template>
</SInputSelect>
```

## Events

Here are the list of events the component may emit.

### `@update:model-value`

Emits when the user selects the item. This event is always emitted together with `change` event.

```ts
interface Emits {
  (e: 'update:model-value', value: Value): void
}

type Value = string | number | boolean | null
```

### `@change`

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
