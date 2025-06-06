<script setup lang="ts">
import { ref } from 'vue'
import SInputNumber from 'sefirot/components/SInputNumber.vue'

const input = ref<number | null>(null)
</script>

# SInputNumber

`<SInputNumber>` is a input component for `number`.

<Showcase
  path="/components/SInputNumber.vue"
  story="/stories-components-sinputnumber-01-playground-story-vue"
>
  <SInputNumber placeholder="123,456,789" v-model="input" />
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

### `:size`

Defines the size of the input. The default is `small`.

```ts
interface Props {
  size?: 'mini' | 'small' | 'medium'
}
```

```vue-html
<SInputNumber size="small" v-model="..." />
```

### `:name`

Defines the `name` attribute of the underlining `<input>` element.

```ts
interface Props {
  name?: string
}
```

```vue-html
<SInputNumber name="age" v-model="..." />
```

### `:label`

Defines the label text of the input.

```ts
interface Props {
  label?: string
}
```

```vue-html
<SInputNumber label="Age" v-model="..." />
```

### `:info`

Shows help icon after the label and shows info in a tooltip when the user hovers the label.

```ts
interface Props {
  info?: string
}
```

```vue-html
<SInputNumber
  label="Age"
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
<SInputNumber label="Age" note="Optional" v-model="..." />
```

### `:placeholder`

Defines the placeholder text to show when the value is empty.

```ts
interface Props {
  placeholder?: string
}
```

```vue-html
<SInputNumber placeholder="123456789" v-model="..." />
```

### `:unit-before`

Add a static text or icon before the input box.

```ts
interface Props {
  unitBefore?: string | Icon
}
```

```vue-html
<SInputNumber unit-before="$" v-model="..." />
```

### `:unit-after`

Add a static text or icon after the input box.

```ts
interface Props {
  unitAfter?: string | Icon
}
```

```vue-html
<SInputNumber unit-after="USD" v-model="..." />
```

### `:check-icon`

Icon to display at corner right of label. Useful to show the status of a particular input.

```ts
interface Props {
  checkIcon?: Component
}
```

```vue-html
<SInputNumber :check-icon="IconCheckCircle" />
```

### `:check-text`

Text to display alongside `check-icon`.

```ts
interface Props {
  checkText?: string
}
```

```vue-html
<SInputNumber :check-text="Saved" />
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
<SInputNumber
  :check-icon="IconCheckCircle"
  check-text="Uploaded"
  check-color="success"
/>
```

### `:text-color`

Defines the color of the input text. You can pass the `TextColor` or the callback that takes an input value as an argument and returns the `TextColor`. The default is `neutral`.

```ts
interface Props {
  textColor?: TextColor | ((value: number | null) => TextColor)
}

type TextColor = 
  | 'neutral'
  | 'info'
  | 'success'
  | 'warning'
  | 'danger'
```

```vue-html
<SInputNumber text-color="info" v-model="..." />
```

### `:align`

Defines how the input value is aligned inside the input box. The default is `left`.

```ts
interface Props {
  align?: 'left' | 'center' | 'right'
}
```

```vue-html
<SInputNumber align="right" v-model="..." />
```

### `:separator`

When this prop is set, the value gets displayed by adding comma to every 3 digits in the number. For example, `123456789` becomes `123,456,789`. The default is `false`.

```ts
interface Props {
  separator?: boolean
}
```

```vue-html
<SInputNumber separator v-model="..." />
```

### `:disabled`

Mark input as disabled. When this prop is set, users may not be able to focus the element not trigger any events.

```ts
interface Props {
  disabled?: boolean
}
```

```vue-html
<SInputNumber disabled v-model="..." />
```

### `:value`

Sets the input value. When `model-value` prop is set (e.g. via `v-model` directive), this prop gets ignored.

```ts
interface Props {
  value?: number | null
}
```

```vue-html
<SInputNumber :value="1" />
```

### `:model-value`

The `v-model` binding for the input.

```ts
interface Props {
  modelValue?: number | null
}
```

```vue-html
<SInputNumber v-model="1" />
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
<SInputNumber v-model="1" :validation />
```

### `:hide-error`

Stop showing validation error message even when there are errors. This prop will not prevent the error color from appearing.

```ts
interface Props {
  hideError?: boolean
}
```

```vue-html
<SInputNumber
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
<SInputNumber label="Age" v-model="...">
  <template #info>
    Learn more about this field <SLink href="...">here</SLink>.
  </template>
</SInputNumber>
```

### `#addon-before`

Inject [`<SInputAddon>`](/components/input-addon) before the input. Learn more details about addon in [Components: SInputAddon](/components/input-addon).

```vue-html
<SInputNumber label="..." v-model="...">
  <template #addon-before>
    <SInputAddon label="@" />
  </template>
</SInputNumber>
```

### `#addon-after`

Inject [`<SInputAddon>`](/components/input-addon) after the input. Learn more details about addon in [Components: SInputAddon](/components/input-addon).

```vue-html
<SInputNumber label="..." v-model="...">
  <template #addon-after>
    <SInputAddon label="@" />
  </template>
</SInputNumber>
```

## Events

Here are the list of events the component may emit.

### `@update:model-value`

Emits when the user inputs any value. This event is always emitted together with `input` event.

```ts
interface Emits {
  (e: 'update:model-value', value: number | null): void
}
```

### `@input`

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
