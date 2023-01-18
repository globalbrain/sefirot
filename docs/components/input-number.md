<script setup lang="ts">
import { ref } from 'vue'
import SInputNumber from 'sefirot/components/SInputNumber.vue'

const input = ref<number | null>(null)
</script>

# SInputNumber

`<SInputNumber>` is a input component for `number`. It uses the `SInputText` component under the hood and shares many common props. However, it has some "number" specific props as well and does not accept the string values.

<Showcase
  path="/components/SInputNumber.vue"
  story="/stories-components-sinputnumber-01-playground-story-vue"
>
  <SInputNumber placeholder="123456789" v-model="input" />
</Showcase>

## Usage

Import `<SInputNumber>` component and pass in the `value` prop.

```vue
<script setup lang="ts">
import { ref } from 'vue'
import SInputNumber from '@globalbrain/sefirot/lib/components/SInputNumber.vue'

const input = ref<number | null>(null)
</script>

<template>
  <SInputNumber placeholder="123456789" v-model="input" />
</template>
```

## Props

Here are the list of props you may pass to the component.

### `size`

Defines the size of the input. The default is `small`.

```ts
interface Props {
  size?: 'mini' | 'small' | 'medium'
}
```

```vue
<SInputNumber size="small" v-model="..." />
```

### `name`

Defines the `name` attribute of the underlining `<input>` element.

```ts
interface Props {
  name?: string
}
```

```vue
<SInputNumber name="age" v-model="..." />
```

### `label`

Defines the label text of the input.

```ts
interface Props {
  label?: string
}
```

```vue
<SInputNumber label="Age" v-model="..." />
```

### `note`

Adds small help text after the label. Best used along with `label` prop.

```ts
interface Props {
  note?: string
}
```

```vue
<SInputNumber label="Age" note="Optional" v-model="..." />
```

### `placeholder`

Defines the placeholder text to show when the value is empty.

```ts
interface Props {
  placeholder?: string
}
```

```vue
<SInputNumber placeholder="123456789" v-model="..." />
```

### `align`

Defines how the input value is aligned inside the input box. The default is `left`.

```ts
interface Props {
  align?: 'left' | 'center' | 'right'
}
```

```vue
<SInputNumber align="right" v-model="..." />
```

### `separator`

When this prop is set, the value gets displayed by adding comma to every 3 digits in the number. For example, `123456789` becomes `123,456,789`. The default is `false`.

```ts
interface Props {
  separator?: boolean
}
```

```vue
<SInputNumber separator v-model="..." />
```

### `disabled`

Mark input as disabled. When this prop is set, users may not be able to focus the element not trigger any events.

```ts
interface Props {
  disabled?: boolean
}
```

```vue
<SInputNumber disabled v-model="..." />
```

### `value`

Sets the input value. When `model-value` prop is set (e.g. via `v-model` directive), this prop gets ignored.

```ts
interface Props {
  value?: number | null
}
```

```vue
<SInputNumber :value="1" />
```

### `model-value`

The `v-model` binding for the input.

```ts
interface Props {
  modelValue?: number | null
}
```

```vue
<SInputNumber v-model="1" />
```

### `validation`

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

```vue
<SInputNumber v-model="1" :validation="validation" />
```

### `hide-error`

Stop showing validation error message even when there are errors. This prop will not prevent the error color from appearing.

```ts
interface Props {
  hideError?: boolean
}
```

```vue
<SInputSelect
  v-model="1"
  :validation="validation"
  hide-error
/>
```

## Events

Here are the list of events the component may emit.

### `update:model-value`

Emits when the user inputs any value. This event is always emitted together with `input` event.

```ts
interface Emits {
  (e: 'update:model-value', value: number | null): void
}
```

### `input`

Emits when the user inputs any value. This event is always emitted together with `update:model-value` event.

```ts
interface Emits {
  (e: 'change', value: number | null): void
}
```

## Styles

You may customize the styles by overriding `--input` prefixed CSS variables.

### Global input styles

You may customize the various styles of the component via global input related CSS variables. Please refer to [Styles: Input Styles](../styles/input-styles) page.
