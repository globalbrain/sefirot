<script setup lang="ts">
import { ref } from 'vue'
import SInputFile from 'sefirot/components/SInputFile.vue'

const input = ref(null)
</script>

# SInputFile

`<SInputFile>` is a file select input component.

<Showcase
  path="/components/SInputFile.vue"
  story="input-file-01-playground"
>
  <SInputFile placeholder="No file choosen" v-model="input" />
</Showcase>

## Usage

Import `<SInputFile>` and pass in the `value` prop.

```vue
<script setup lang="ts">
import { ref } from 'vue'
import SInputFile from '@globalbrain/sefirot/lib/components/SInputFile.vue'

const input = ref<File | File[] | null>(null)
</script>

<template>
  <SInputFile placeholder="No file choosen" v-model="input" />
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
<SInputFile size="small" v-model="..." />
```

### `:label`

Defines the label text of the input.

```ts
interface Props {
  label?: string
}
```

```vue-html
<SInputFile label="Upload file" v-model="..." />
```

### `:info`

Shows help icon after the label and shows info in a tooltip when the user hovers the label.

```ts
interface Props {
  info?: string
}
```

```vue-html
<SInputFile
  label="Upload image"
  info="This will be used as your avatar."
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
<SInputFile
  label="Upload file"
  note="Optional"
  v-model="..."
/>
```

### `:help`

Adds small help text to the bottom of the input.

```ts
interface Props {
  help?: string
}
```

```vue-html
<SInputFile
  label="Upload file"
  help="Accepts only JPG and PNG."
  v-model="..."
/>
```

### `:text`

Defines the text of the button. Defaults to `'Choose File'`.

```ts
interface Props {
  text?: string
}
```

```vue-html
<SInputFile text="Select File" v-model="..." />
```

### `:placeholder`

Defines the placeholder text to show when the value is empty.

```ts
interface Props {
  placeholder?: string
}
```

```vue-html
<SInputFile placeholder="No file choosen" v-model="..." />
```

### `:accept`

Defines the file types to accept.

```ts
interface Props {
  accept?: string
}
```

```vue-html
<SInputFile accept="image/*" v-model="..." />
```

### `:multiple`

Defines whether to accept multiple files.

```ts
interface Props {
  multiple?: boolean
}
```

```vue-html
<SInputFile multiple v-model="..." />
```

### `:check-icon`

Icon to display at corner right of label. Useful to show the status of a particular input.

```ts
interface Props {
  checkIcon?: Component
}
```

```vue-html
<SInputFile :check-icon="IconCheckCircle" />
```

### `:check-text`

Text to display alongside `check-icon`.

```ts
interface Props {
  checkText?: string
}
```

```vue-html
<SInputFile :check-text="Saved" />
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
<SInputFile
  :check-icon="IconCheckCircle"
  check-text="Uploaded"
  check-color="success"
/>
```

### `:value`

Sets the input value. When `model-value` prop is set (e.g. via `v-model` directive), this prop gets ignored.

```ts
interface Props {
  value?: File | File[] | null
}
```

```vue-html
<SInputFile :value="file" />
```

### `:model-value`

The `v-model` binding for the input.

```ts
interface Props {
  modelValue?: File | File[] | null
}
```

```vue-html
<SInputFile v-model="file" />
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
<SInputFile
  v-model="file"
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
<SInputFile
  v-model="file"
  :validation="validation"
  hide-error
/>
```

## Slots

Here are the list of slots you may define within the component.

### `#info` {#info-slot}

Same as `info` prop. When `info` prop and this slot are defined at the same time, this slot will take precedence.

```vue-html
<SInputFile label="Upload image" v-model="...">
  <template #info>
    Learn more about this field <SLink href="...">here</SLink>.
  </template>
</SInputFile>
```

## Events

Here are the list of events the component may emit.

### `@update:model-value`

Emits when the user selects the item. This event is always emitted together with `change` event.

```ts
interface Emits {
  (e: 'update:model-value', value: File | File[] | null): void
}
```

### `@change`

Emits when the user selects the item. This event is always emitted together with `update:model-value` event.

```ts
interface Emits {
  (e: 'change', value: File | File[] | null): void
}
```

## Styles

You may customize the styles by overriding `--input` prefixed CSS variables.

### Global input styles

You may customize the various styles of the component via global input related CSS variables. Please refer to [Styles: Input Styles](../styles/input-styles) page.
