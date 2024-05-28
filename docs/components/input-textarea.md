<script setup lang="ts">
import { ref } from 'vue'
import SInputTextarea from 'sefirot/components/SInputTextarea.vue'

const input = ref<string | null>(null)
</script>

# SInputTextarea

`<SInputTextarea>` is a input component for `textarea`.

<Showcase
  path="/components/SInputTextarea.vue"
  story="/stories-components-sinputtextarea-01-playground-story-vue"
>
  <SInputTextarea placeholder="Placeholder text" v-model="input" />
</Showcase>

## Usage

Import `<SInputTextarea>` component and pass in the `value` prop.

```vue
<script setup lang="ts">
import { ref } from 'vue'
import SInputTextarea from '@globalbrain/sefirot/lib/components/SInputTextarea.vue'

const input = ref<string | null>(null)
</script>

<template>
  <SInputTextarea placeholder="Placeholder text" v-model="input" />
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
<SInputTextarea size="small" v-model="..." />
```

### `:name`

Defines the `name` attribute of the underlining `<input>` element.

```ts
interface Props {
  name?: string
}
```

```vue-html
<SInputTextarea name="message" v-model="..." />
```

### `:label`

Defines the label text of the input.

```ts
interface Props {
  label?: string
}
```

```vue-html
<SInputTextarea label="Message" v-model="..." />
```

### `:info`

Shows help icon after the label and shows info in a tooltip when the user hovers the label.

```ts
interface Props {
  info?: string
}
```

```vue-html
<SInputTextarea
  label="Message"
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
<SInputTextarea label="Message" note="Optional" v-model="..." />
```

### `:placeholder`

Defines the placeholder text to show when the value is empty.

```ts
interface Props {
  placeholder?: string
}
```

```vue-html
<SInputTextarea placeholder="Placeholder text" v-model="..." />
```

### `:check-icon`

Icon to display at corner right of label. Useful to show the status of a particular input.

```ts
import { IconifyIcon } from '@iconify/vue/dist/offline'
import { DefineComponent } from 'vue'

interface Props {
  checkIcon?: IconifyIcon | DefineComponent
}
```

```vue-html
<SInputTextarea :check-icon="IconCheckCircle" v-model="..." />
```

### `:check-text`

Text to display alongside `check-icon`.

```ts
interface Props {
  checkText?: string
}
```

```vue-html
<SInputTextarea :check-text="Saved" v-model="..." />
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
<SInputTextarea
  :check-icon="IconCheckCircle"
  check-text="Uploaded"
  check-color="success"
  v-model="..."
/>
```

### `:rows`

Defines the height of the input. The default is `3`.

If you pass `'fill'`, the input will fill the available space defined by the parent container. Setting this to `'fill'` needs `display: flex` on the parent container.

```ts
interface Props {
  rows?: number | 'fill'
}
```

```vue-html
<SInputTextarea :rows="8" v-model="..." />
```

### `:auto-resize`

Automatically resize the height of the input based on the content. The default is `false`.

When this prop is set, the `:rows` will be treated as `min-height`. For example, `:rows="5"` will set the minimum height of the input to 5 rows, and auto resize from there based on the content.

If you pass a number, it will be the maximum number of rows before it starts to scroll. If you pass `true`, no maximum height will be set. This feature uses [`field-sizing`](https://caniuse.com/mdn-css_properties_field-sizing_content) CSS property.

```ts
interface Props {
  autoResize?: boolean | number
}
```

```vue-html
<SInputTextarea :auto-resize="10" v-model="..." />
```

### `:disabled`

Mark input as disabled. When this prop is set, users may not be able to focus the element not trigger any events.

```ts
interface Props {
  disabled?: boolean
}
```

```vue-html
<SInputTextarea disabled v-model="..." />
```

### `:value`

Sets the input value. When `model-value` prop is set (e.g. via `v-model` directive), this prop gets ignored.

```ts
interface Props {
  value?: string | null
}
```

```vue-html
<SInputTextarea :value="Lorem ipsum..." />
```

### `:model-value`

The `v-model` binding for the input.

```ts
interface Props {
  modelValue?: string | null
}
```

```vue-html
<SInputTextarea v-model="Lorem ipsum..." />
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
<SInputTextarea v-model="..." :validation="validation" />
```

### `:hide-error`

Stop showing validation error message even when there are errors. This prop will not prevent the error color from appearing.

```ts
interface Props {
  hideError?: boolean
}
```

```vue-html
<SInputTextarea
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
<SInputTextarea label="Message" v-model="...">
  <template #info>
    Learn more about this field <SLink href="...">here</SLink>.
  </template>
</SInputTextarea>
```

## Events

Here are the list of events the component may emit.

### `@update:model-value`

Emits when the user inputs value, and when the focus is out. This event is always emitted together with `input` and `blur` event.

```ts
interface Emits {
  (e: 'update:model-value', value: string | null): void
}
```

### `@input`

Emits when the user inputs any value. This event is always emitted together with `update:model-value` event.

```ts
interface Emits {
  (e: 'input', value: string | null): void
}
```

### `@blur`

Emits when the input lose its focus. This event is always emitted together with `update:model-value` event.

```ts
interface Emits {
  (e: 'blur', value: string | null): void
}
```

## Styles

You may customize the styles by overriding `--input` prefixed CSS variables.

### Global input styles

You may customize the various styles of the component via global input related CSS variables. Please refer to [Styles: Input Styles](../styles/input-styles) page.
