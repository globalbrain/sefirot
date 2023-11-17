<script setup lang="ts">
import { ref } from 'vue'
import SInputSegments from 'sefirot/components/SInputSegments.vue'

const options = [
  { label: 'Table', value: 'table' },
  { label: 'List', value: 'list' },
  { label: 'Board', value: 'board' },
  { label: 'Card', value: 'card' }
]

const value = ref('table')
</script>

# SInputSegments

`<SInputSegments>` is used to pick one choice from a linear set of closely related choices.

<Showcase
  path="/components/SInputSegments.vue"
  story="/stories-components-sinputsegments-01-playground-story-vue"
>
  <SInputSegments :options="options" v-model="value" />
</Showcase>

## Usage

Define options and set value. `<SInputSegments>` requires an option to be selected. If you do not define either `:value` or `v-model`, it will throw an error.

```vue
<script setup lang="ts">
import { ref } from 'vue'
import SInputSegments from '@globalbrain/sefirot/lib/components/SInputSegments.vue'

const options = [
  { label: 'Table', value: 'table' },
  { label: 'List', value: 'list' },
  { label: 'Board', value: 'board' },
  { label: 'Card', value: 'card' }
]

const value = ref('table')
</script>

<template>
  <SInputSegments :options="options" v-model="value" />
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
<SInputSegments
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
<SInputSegments
  label="Project view"
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
<SInputSegments
  label="Domain"
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
<SInputSegments
  label="Project view"
  note="A short note"
  :options="[...]"
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
<SInputSegments :check-icon="IconCheckCircle" />
```

### `:check-text`

Text to display alongside `check-icon`.

```ts
interface Props {
  checkText?: string
}
```

```vue-html
<SInputSegments :check-text="Saved" />
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
<SInputSegments
  :check-icon="IconCheckCircle"
  check-text="Saved"
  check-color="success"
/>
```

### `:options`

The list of selectable options for the input.

```ts
interface Props<T extends string | number | boolean> {
  options?: Option<T>[]
}

interface Option<T extends string | number | boolean> {
  label: string
  value: T
  mode?: Mode
  disabled?: boolean
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
<SInputSegments
  :options="[
    { label: 'Item 001', value: 1 },
    { label: 'Item 002', value: 2 },
    { label: 'Item 003', value: 3 }
  ]"
  v-model="..."
/>
```

### `:block`

stretch each button evenly to fill the width of the control's parent. This option is intended to make the input easier to adapt into different layouts.

```ts
interface Props {
  block?: boolean
}
```

```vue-html
<SInputSegments
  :options=""
  block
  v-model="..."
/>
```

### `:disabled`

Mark all options as disabled. You may also set `disabled` property on each option to disable specific options.

When this prop is set, users may not be able to focus the element not trigger any events.

```ts
interface Props {
  disabled?: boolean
}
```

```vue-html
<SInputSegments
  :options="[...]"
  disabled
  v-model="..."
/>
```

### `:value`

Sets the input value. When `model-value` prop is set (e.g. via `v-model` directive), this prop gets ignored.

```ts
interface Props<T extends string | number | boolean> {
  value?: T
}
```

```vue-html
<SInputSegments
  :options="[...]"
  :value="1"
/>
```

### `:model-value`

The `v-model` binding for the input.

```ts
interface Props<T extends string | number | boolean> {
  modelValue?: T
}
```

```vue-html
<SInputSegments
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
<SInputSegments
  :options="[...]"
  v-model="1"
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
<SInputSegments
  :options="[...]"
  v-model="1"
  :validation="validation"
  hide-error
/>
```

## Slots

Here are the list of slots you may define within the component.

### `#info` {#info-slot}

Same as `info` prop. When `info` prop and this slot are defined at the same time, this slot will take precedence.

```vue-html
<SInputSegments :options="..." v-model="...">
  <template #info>
    Learn more about this field <SLink href="...">here</SLink>.
  </template>
</SInputSegments>
```

## Events

Here are the list of events the component may emit.

### `@update:model-value`

Emits when the user selects the item. This event is always emitted together with `change` event.

```ts
interface Emits<T extends string | number | boolean> {
  (e: 'update:model-value', value: T): void
}
```

### `@change`

Emits when the user selects the item. This event is always emitted together with `update:model-value` event.

```ts
interface Emits<T extends string | number | boolean> {
  (e: 'change', value: T): void
}
```

## Styles

You may customize the styles by overriding `--input` prefixed CSS variables.

### Global input styles

You may customize the various styles of the component via global input related CSS variables. Please refer to [Styles: Input Styles](../styles/input-styles) page.

### Button styles

Each option styles shares the style of [`<SButton>`](button#styles). Refer to the component docs for available CSS variables.
