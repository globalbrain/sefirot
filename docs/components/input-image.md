<script setup lang="ts">
import { shallowRef } from 'vue'
import SInputImage from 'sefirot/components/SInputImage.vue'

const input = shallowRef(null)
</script>

# SInputImage

`<SInputFile>` is a file select input component.

<Showcase
  path="/components/SInputImage.vue"
  story="/stories-components-sinputimage-01-playground-story-vue"
>
  <SInputImage help="JPG or PNG. 500KB max." v-model="input" />
</Showcase>

## Usage

The only required prop is `:value` or `v-model`. The value of the input is a `File` object and must be image file that can be rendered on the browser. The input will not automatically validate the file type. You should use `:accept` prop to limit the selectable file types, or use `:validation` prop to validate the file type.

```vue
<script setup lang="ts">
import { shallowRef } from 'vue'
import SInputImage from '@globalbrain/sefirot/lib/components/SInputImage.vue'

const input = shallowRef<File | null>(null)
</script>

<template>
  <SInputImage v-model="input" />
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
<SInputImage size="small" v-model="..." />
```

### `:label`

Defines the label text of the input.

```ts
interface Props {
  label?: string
}
```

```vue-html
<SInputImage label="Upload image" v-model="..." />
```

### `:info`

Shows help icon after the label and shows info in a tooltip when the user hovers the label.

```ts
interface Props {
  info?: string
}
```

```vue-html
<SInputImage
  label="Upload image"
  info="This will be used as your avatar."
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
<SInputImage
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
<SInputImage
  label="Upload file"
  help="JPG or PNG. 500KB max."
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
<SInputImage :check-icon="IconCheckCircle" v-model="..." />
```

### `:check-text`

Text to display alongside `:check-icon`.

```ts
interface Props {
  checkText?: string
}
```

```vue-html
<SInputImage :check-text="Saved" v-model="..." />
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
<SInputImage
  :check-icon="IconCheckCircle"
  check-text="Saved"
  check-color="success"
  v-model="..." />
/>
```

### `:image-type`

The type of image to display. The type can be either `'rectangle'` or `'circle'`. The default is `'rectangle'`.

```ts
interface Props {
  imageType?: ImageType
}

type ImageType = 'rectangle' | 'circle'
```

```vue-html
<SInputImage image-type="circle" v-model="..." />
```

### `:image-width`

The width of the image placeholder. The default is `'96px'`. You may also control the width by `--input-image-width` CSS variable. Using CSS variable is recommended when you need responsive design.

```ts
interface Props {
  imageWidth?: string
}
```

```vue-html
<SInputImage image-with="128px" v-model="..." />
```

### `:image-aspect-ratio`

Set the aspect ratio of the image placeholder. The default is `'1 / 1'`. The value is directly passed to CSS property `aspect-ratio`.

```ts
interface Props {
  imageAspectRatio?: string
}
```

```vue-html
<SInputImage image-aspect-ratio="16 / 9" v-model="..." />
```

### `:select-text`

The text for the "select image" button. The default is `'Select image'`.

```ts
interface Props {
  selectText?: string
}
```

```vue-html
<SInputImage select-text="Upload" v-model="..." />
```

### `:remove-text`

The text for the "remove image" button. The default is `'Remove image'`.

```ts
interface Props {
  removeText?: string
}
```

```vue-html
<SInputImage remove-text="Delete" v-model="..." />
```

### `:accept`

Defines the file types to accept.

```ts
interface Props {
  accept?: string
}
```

```vue-html
<SInputImage accept="image/*" v-model="..." />
```

### `:nullable`

Whether a user can remove the selected image. The default is `true`.

```ts
interface Props {
  nullable?: boolean
}
```

```vue-html
<SInputImage :nullable="false" v-model="..." />
```

### `:disabled`

Disbale the input. When disabled, the user cannot select nor remove the image. The default is `false`.

```ts
interface Props {
  disabled?: boolean
}
```

```vue-html
<SInputImage disabled v-model="..." />
```

### `:value`

Sets the input value. When `:model-value` is set (e.g. via `v-model` directive), this prop is ignored.

```ts
interface Props {
  value?: File |  null
}
```

```vue-html
<SInputImage :value="file" />
```

### `:model-value`

The `v-model` binding for the input.

```ts
interface Props {
  modelValue?: File | null
}
```

```vue-html
<SInputImage v-model="file" />
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
<SInputImage
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
<SInputImage
  v-model="file"
  :validation="validation"
  hide-error
/>
```

## Slots

Here are the list of slots you may define within the component.

### `#info` {#info-slot}

Same as `:info` prop. When both `:info` and this slot are defined, this slot will take precedence.

```vue-html
<SInputImage label="Upload image" v-model="...">
  <template #info>
    Learn more about this field <SLink href="...">here</SLink>.
  </template>
</SInputImage>
```

## Events

Here are the list of events the component may emit.

### `@update:model-value`

Emits when the user selects the item. This event is always emitted together with the `@change` event.

```ts
interface Emits {
  (e: 'update:model-value', value: File | null): void
}
```

### `@change`

Emits when the user selects the item. This event is always emitted together with the `@update:model-value` event.

```ts
interface Emits {
  (e: 'change', value: File | null): void
}
```

## Styles

You may customize the styles by overriding `--input` prefixed CSS variables.

### Global input styles

You may customize the various styles of the component via global input related CSS variables. Please refer to [Styles: Input Styles](../styles/input-styles) page.

### Image placeholder width

Use `--input-image-width` to set the width of the image placeholder. When set, this variable will override `:image-width`.

```css
:root {
  --input-image-width: undefined;
}
```
