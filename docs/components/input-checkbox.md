<script setup lang="ts">
import { ref } from 'vue'
import SInputCheckbox from 'sefirot/components/SInputCheckbox.vue'

const input = ref(false)
</script>

# SInputCheckboxes

`<SInputCheckbox>` is a single checkbox input component.

<Showcase
  path="/components/SInputCheckbox.vue"
  story="/stories-components-sinputcheckbox-01-playground-story-vue"
>
  <SInputCheckbox text="Item 001" v-model="input" />
</Showcase>

## Usage

Import `<SInputCheckbox>` component and pass in `value` props.

```vue
<script setup lang="ts">
import { ref } from 'vue'
import SInputCheckbox from '@globalbrain/sefirot/lib/components/SInputCheckbox.vue'

const input = ref(false)
</script>

<template>
  <SInputCheckbox text="Item 001" v-model="input" />
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
<SInputCheckbox size="small" v-model="..." />
```

### `:label`

Defines the label text of the input.

```ts
interface Props {
  label?: string
}
```

```vue-html
<SInputCheckbox label="Agreement" v-model="..." />
```

### `:info`

Shows help icon after the label and shows info in a tooltip when the user hovers the label.

```ts
interface Props {
  info?: string
}
```

```vue-html
<SInputCheckbox
  label="Agreement"
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
<SInputCheckbox
  label="Agreement"
  note="Optional"
  v-model="..."
/>
```

### `:check-icon`

Icon to display at corner right of label. Useful to show the status of a particular input.

```ts
import { IconifyIcon } from '@iconify/vue/dist/offline'

interface Props {
  checkIcon?: IconifyIcon
}
```

```vue-html
<SInputCheckbox :check-icon="IconCheckCircle" v-model="..." />
```

### `:check-text`

Text to display alongside `check-icon`.

```ts
interface Props {
  checkText?: string
}
```

```vue-html
<SInputCheckbox :check-text="Saved" v-model="..." />
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
<SInputCheckbox
  :check-icon="IconCheckCircle"
  check-text="Uploaded"
  check-color="success"
  v-model="..."
/>
```

### `:text`

The text for the checkbox.

```ts
interface Props {
  text?: string
}
```

```vue-html
<SInputCheckbox
  text="Agree to our privacy policy"
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
<SInputCheckbox disabled v-model="..." />
```

### `:value`

Sets the input value. When `model-value` prop is set (e.g. via `v-model` directive), this prop gets ignored.

```ts
interface Props {
  value?: boolean
}
```

```vue-html
<SInputCheckbox :value="true" />
```

### `:model-value`

The `v-model` binding for the input.

```ts
interface Props {
  modelValue?: boolean
}
```

```vue-html
<SInputCheckbox v-model="true" />
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
<SInputCheckbox
  v-model="..."
  :validation="validation"
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
<SInputCheckbox
  v-model="..."
  :validation="validation"
  hide-error
/>
```

## Slots

Here are the list of slots you may define within the component.

### `#info` {#info-slot}

Same as `info` prop. When `info` prop and this slot are defined at the same time, this slot will take precedence.

```vue-html
<SInputCheckbox label="Agreement" v-model="...">
  <template #info>
    Learn more about this field <SLink href="...">here</SLink>.
  </template>
</SInputCheckbox>
```

## Events

Here are the list of events the component may emit.

### `@update:model-value`

Emits when the user selects the item. This event is always emitted together with `change` event.

```ts
interface Emits {
  (e: 'update:model-value', value: boolean): void
}
```

### `@change`

Emits when the user selects the item. This event is always emitted together with `update:model-value` event.

```ts
interface Emits {
  (e: 'change', value: boolean): void
}
```

## Styles

You may customize the styles by overriding `--input` prefixed CSS variables.

### Global input styles

You may customize the various styles of the component via global input related CSS variables. Please refer to [Styles: Input Styles](../styles/input-styles) page.
