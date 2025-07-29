<script setup lang="ts">
import { ref } from 'vue'
import SInputHMS from 'sefirot/components/SInputHMS.vue'

const input = ref({
  hour: null,
  minute: null,
  second: null
})
</script>

# SInputHMS

`<SInputHMS>` is a input component to fill in "Hour", "Minute", and "Second".

<Showcase
  path="/components/SSInputHMS.vue"
  story="/stories-components-sinputhms-01-playground-story-vue"
>
  <SInputHMS v-model="input" />
</Showcase>

## Usage

Import `<SInputHMS>` component and pass in `:value` props. The value should be an object with `hour`, `minute`, and `second` properties.

```vue
<script setup lang="ts">
import { ref } from 'vue'
import SInputHMS from '@globalbrain/sefirot/lib/components/SInputHMS.vue'

const input = ref({
  hour: null,
  minute: null,
  second: null
})
</script>

<template>
  <SInputHMS v-model="input" />
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
<SInputHMS size="small" v-model="..." />
```

### `:label`

Defines the label text of the input.

```ts
interface Props {
  label?: string
}
```

```vue-html
<SInputHMS label="Time" v-model="..." />
```

### `:info`

Shows help icon after the label and shows info in a tooltip when the user hovers the label.

```ts
interface Props {
  info?: string
}
```

```vue-html
<SInputHMS
  label="Time"
  info="Some helpful information."
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
<SInputHMS
  label="Time"
  note="Optional"
  v-model="..."
/>
```

### `:placeholder`

Defines the placeholder to show when the value is empty. The default is `00:00:00`.

```ts
interface Props {
  placeholder?: Placeholder
}

interface Placeholder {
  hour: string
  minute: string
  second: string
}
```

```vue-html
<SInputHMS
  :placeholder="{
    hour: 18,
    minute: 30,
    second: 15
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
<SInputHMS :check-icon="IconCheckCircle" v-model="..." />
```

### `:check-text`

Text to display alongside `:check-icon`.

```ts
interface Props {
  checkText?: string
}
```

```vue-html
<SInputHMS :check-text="Saved" v-model="..." />
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
<SInputHMS
  :check-icon="IconCheckCircle"
  check-text="Uploaded"
  check-color="success"
  v-model="..."
/>
```

### `:no-hour`

Hide the "hour" input.

```ts
interface Props {
  noHour?: boolean
}
```

```vue-html
<SInputHMS no-hour v-model="..." />
```

### `:no-minute`

Hide the "minute" input.

```ts
interface Props {
  noMinute?: boolean
}
```

```vue-html
<SInputHMS no-minute v-model="..." />
```

### `:no-second`

Hide the "second" input.

```ts
interface Props {
  noSecond?: boolean
}
```

```vue-html
<SInputHMS no-second v-model="..." />
```

### `:disabled`

Mark input as disabled. When this prop is set, users may not be able to focus the element nor trigger any events.

```ts
interface Props {
  disabled?: boolean
}
```

```vue-html
<SInputHMS disabled v-model="..." />
```

### `:value`

Sets the input value. When `:model-value` is set (e.g. via `v-model` directive), this prop is ignored.

```ts
interface Props {
  value?: Value
}

interface Value {
  hour: string | null
  minute: string | null
  second: string | null
}
```

```vue-html
<SInputHMS :value />
```

### `:model-value`

The `v-model` binding for the input.

```ts
interface Props {
  value?: Value
}

interface Value {
  hour: string | null
  minute: string | null
  second: string | null
}
```

```vue-html
<SInputHMS v-model="value" />
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
<SInputHMS v-model="..." :validation />
```

### `:hide-error`

Stop showing validation error message even when there are errors. This prop will not prevent the error color from appearing.

```ts
interface Props {
  hideError?: boolean
}
```

```vue-html
<SInputHMS 
  v-model="1"
  :validation
  hide-error
/>
```

## Slots

Here are the list of slots you may define within the component.

### `#info` {#info-slot}

Same as `:info` prop. When both `:info` and this slot are defined, this slot will take precedence.

```vue-html
<SInputHMS label="Time" v-model="...">
  <template #info>
    Learn more about this field <SLink href="...">here</SLink>.
  </template>
</SInputHMS>
```

## Events

Here are the list of events the component may emit.

### `@update:model-value`

Emits when the user selects the item. This event is always emitted together with the `@change` event.

```ts
interface Emits {
  (e: 'update:model-value', value: Value): void
}

interface Value {
  hour: string | null
  minute: string | null
  second: string | null
}
```

### `@change`

Emits when the user selects the item. This event is always emitted together with the `@update:model-value` event.

```ts
interface Emits {
  (e: 'change', value: Value): void
}

interface Value {
  hour: string | null
  minute: string | null
  second: string | null
}
```

## Styles

You may customize the styles by overriding `--input` prefixed CSS variables.

### Global input styles

You may customize the various styles of the component via global input related CSS variables. Please refer to [Styles: Input Styles](../styles/input-styles) page.
