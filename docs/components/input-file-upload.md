<script setup lang="ts">
import { ref } from 'vue'
import SInputFileUpload from 'sefirot/components/SInputFileUpload.vue'

const input = ref([])
</script>

# SInputFileUpload

`<SInputFileUpload>` is a multiple file select component. It has more advanced features compared to `<SInputFile>` such as listing selected files individually, removing selected files, and more.

<Showcase
  path="/components/SInputFileUpload.vue"
  story="/stories-components-sinputfileupload-01-playground-story-vue"
>
  <SInputFileUpload v-model="input" />
</Showcase>

## Import

```ts
import SInputFileUpload from '@globalbrain/sefirot/lib/components/SInputFileUpload.vue'
```

## Usage

Import `<SInputFileUpload>` and pass in value as either `v-model` or `:value`. The value should be an array of `File` objects.

```vue
<script setup lang="ts">
import { ref } from 'vue'
import SInputFile from '@globalbrain/sefirot/lib/components/SInputFile.vue'

const input = ref<File[]>([])
</script>

<template>
  <SInputFileUpload v-model="input" />
</template>
```

## Props

```ts
interface Props {
  size?: Size
  label?: string
  info?: string
  note?: string
  help?: string
  text?: string
  placeholder?: string
  emptyText?: string
  accept?: string
  multiple?: boolean
  checkIcon?: Component
  checkText?: string
  checkColor?: Color
  value?: File[]
  modelValue?: File[]
  hideError?: boolean
  validation?: Validatable
}

type Size =
  | 'mini'
  | 'small'
  | 'medium'

type Color =
  | 'neutral'
  | 'mute'
  | 'info'
  | 'success'
  | 'warning'
  | 'danger'
```

### `:size`

Defines the size of the input. This only affects the size of the label. The default is `small`.

```ts
interface Props {
  size?: 'mini' | 'small' | 'medium'
}
```

```vue-html
<SInputFileUpload size="small" v-model="..." />
```

### `:label`

Defines the label text of the input.

```ts
interface Props {
  label?: string
}
```

```vue-html
<SInputFileUpload label="Upload file" v-model="..." />
```

### `:info`

Shows help icon after the label and shows info in a tooltip when the user hovers the label.

```ts
interface Props {
  info?: string
}
```

```vue-html
<SInputFileUpload
  label="Upload image"
  info="The files will be uploaded to the server."
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
<SInputFileUpload
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
<SInputFileUpload
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
<SInputFileUpload text="Select File" v-model="..." />
```

### `:placeholder`

Defines the placeholder text to show right next to file select button. Use this space to describe main validation rules, such as file size limit.

```ts
interface Props {
  placeholder?: string
}
```

```vue-html
<SInputFileUpload
  placeholder="Total 10MB max."
  v-model="..."
/>
```

### `:accept`

Defines the file types to accept.

```ts
interface Props {
  accept?: string
}
```

```vue-html
<SInputFileUpload accept="image/*" v-model="..." />
```

### `:check-icon`

Icon to display at corner right of label. Useful to show the status of a particular input.

```ts
interface Props {
  checkIcon?: Component
}
```

```vue-html
<SInputFileUpload :check-icon="IconCheckCircle" />
```

### `:check-text`

Text to display alongside `check-icon`.

```ts
interface Props {
  checkText?: string
}
```

```vue-html
<SInputFileUpload :check-text="Saved" />
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
<SInputFileUpload
  :check-icon="IconCheckCircle"
  check-text="Uploaded"
  check-color="success"
/>
```

### `:value`

Sets the input value. When `model-value` prop is set (e.g. via `v-model` directive), this prop gets ignored.

```ts
interface Props {
  value?: File[]
}
```

```vue-html
<SInputFileUpload :value="file" />
```

### `:model-value`

The `v-model` binding for the input.

```ts
interface Props {
  modelValue?: File[]
}
```

```vue-html
<SInputFileUpload v-model="file" />
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
<SInputFileUpload
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
<SInputFileUpload
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
<SInputFileUpload label="Upload image" v-model="...">
  <template #info>
    Learn more about this field <SLink href="...">here</SLink>.
  </template>
</SInputFile>
```

## Events

```ts
interface Emits {
  'update:model-value': [files: File[]]
  'change': [files: File[]]
}
```

### `@update:model-value`

Emits when the user selects the item. This event is always emitted together with `change` event.

```ts
interface Emits {
  'update:model-value': [files: File[]]
}
```

### `@change`

Emits when the user selects the item. This event is always emitted together with `update:model-value` event.

```ts
interface Emits {
  change: [files: File[]]
}
```
