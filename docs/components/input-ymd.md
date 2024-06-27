<script setup lang="ts">
import { ref } from 'vue'
import SInputYMD from 'sefirot/components/SInputYMD.vue'

const input = ref({
  year: null,
  month: null,
  date: null
})
</script>

# SInputYMD

`<SInputYMD>` is a input component to fill in "Year", "Month", and "Date".

<Showcase
  path="/components/SInputYMD.vue"
  story="/stories-components-sinputymd-01-playground-story-vue"
>
  <SInputYMD v-model="input" />
</Showcase>

## Usage

Import `<SInputYMD>` component and pass in `:value` props. The value should be an object with `year`, `month`, and `date` properties.

```vue
<script setup lang="ts">
import { ref } from 'vue'
import SInputYMD from '@globalbrain/sefirot/lib/components/SInputYMD.vue'

const input = ref({
  year: null,
  month: null,
  date: null
})
</script>

<template>
  <SInputYMD v-model="input" />
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
<SInputYMD size="small" v-model="..." />
```

### `:label`

Defines the label text of the input.

```ts
interface Props {
  label?: string
}
```

```vue-html
<SInputYMD label="Date" v-model="..." />
```

### `:info`

Shows help icon after the label and shows info in a tooltip when the user hovers the label.

```ts
interface Props {
  info?: string
}
```

```vue-html
<SInputYMD
  label="Date"
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
<SInputYMD
  label="Date"
  note="Optional"
  v-model="..."
/>
```

### `:placeholder`

Defines the placeholder to show when the value is empty. The default is `1998/01/14`, which is the founded date of [Global Brain](https://globalbrain.co.jp/).

```ts
interface Props {
  placeholder?: Placeholder
}

interface Placeholder {
  year: number
  month: number
  date: number
}
```

```vue-html
<SInputYMD
  :placeholder="{
    year: 1985,
    month: 10,
    date: 10
  }"
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
<SInputYMD :check-icon="IconCheckCircle" v-model="..." />
```

### `:check-text`

Text to display alongside `check-icon`.

```ts
interface Props {
  checkText?: string
}
```

```vue-html
<SInputYMD :check-text="Saved" v-model="..." />
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
<SInputYMD
  :check-icon="IconCheckCircle"
  check-text="Uploaded"
  check-color="success"
  v-model="..."
/>
```

### `:no-year`

Hide the "year" input.

```ts
interface Props {
  noYear?: boolean
}
```

```vue-html
<SInputYMD no-year v-model="..." />
```

### `:no-month`

Hide the "month" input.

```ts
interface Props {
  noMonth?: boolean
}
```

```vue-html
<SInputYMD no-month v-model="..." />
```

### `:no-date`

Hide the "date" input.

```ts
interface Props {
  noDate?: boolean
}
```

```vue-html
<SInputYMD no-date v-model="..." />
```

### `:block`

Make the input full width to fit the parent container.

```ts
interface Props {
  block?: boolean
}
```

```vue-html
<SInputYMD block v-model="..." />
```

### `:disabled`

Mark input as disabled. When this prop is set, users may not be able to focus the element nor trigger any events.

```ts
interface Props {
  disabled?: boolean
}
```

```vue-html
<SInputYMD disabled v-model="..." />
```

### `:value`

Sets the input value. When `model-value` prop is set (e.g. via `v-model` directive), this prop gets ignored.

```ts
interface Props {
  value?: Value
}

interface Value {
  year: number | null
  month: number | null
  date: number | null
}
```

```vue-html
<SInputYMD :value="value" />
```

### `:model-value`

The `v-model` binding for the input.

```ts
interface Props {
  value?: Value
}

interface Value {
  year: number | null
  month: number | null
  date: number | null
}
```

```vue-html
<SInputYMD v-model="value" />
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
<SInputYMD v-model="..." :validation="validation" />
```

### `:hide-error`

Stop showing validation error message even when there are errors. This prop will not prevent the error color from appearing.

```ts
interface Props {
  hideError?: boolean
}
```

```vue-html
<SInputYMD 
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
<SInputYMD label="Date" v-model="...">
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

interface Value {
  year: number | null
  month: number | null
  date: number | null
}
```

### `@change`

Emits when the user selects the item. This event is always emitted together with `update:model-value` event.

```ts
interface Emits {
  (e: 'change', value: Value): void
}

interface Value {
  year: number | null
  month: number | null
  date: number | null
}
```

## Styles

You may customize the styles by overriding `--input` prefixed CSS variables.

### Global input styles

You may customize the various styles of the component via global input related CSS variables. Please refer to [Styles: Input Styles](../styles/input-styles) page.
