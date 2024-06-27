<script setup lang="ts">
import { ref } from 'vue'
import SInputSwitch from 'sefirot/components/SInputSwitch.vue'

const input = ref(false)
</script>

# SInputSwitch

`<SInputSwitch>` is a toggle switch input.

<Showcase
  path="/components/SInputSwitch.vue"
  story="/stories-components-sinputselect-01-playground-story-vue"
>
  <SInputSwitch v-model="input" />
</Showcase>

## Usage

Import `<SInputSelect>` component and pass in `value` props.

```vue
<script setup lang="ts">
import { ref } from 'vue'
import SInputSwitch from '@globalbrain/sefirot/lib/components/SInputSwitch.vue'

const input = ref(null)
</script>

<template>
  <SInputSwitch v-model="input" />
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
<SInputSwitch size="small" v-model="..." />
```

### `:label`

Defines the label text of the input.

```ts
interface Props {
  label?: string
}
```

```vue-html
<SInputSelect label="Name" v-model="..." />
```

### `:info`

Shows help icon after the label and shows info in a tooltip when the user hovers the label.

```ts
interface Props {
  info?: string
}
```

```vue-html
<SInputSwitch
  label="Name"
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
<SInputSwitch
  label="Name"
  note="Optional"
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
<SInputSwitch :check-icon="IconCheckCircle" v-model="..." />
```

### `:check-text`

Text to display alongside `check-icon`.

```ts
interface Props {
  checkText?: string
}
```

```vue-html
<SInputSwitch :check-text="Saved" v-model="..." />
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
<SInputSwitch
  :check-icon="IconCheckCircle"
  check-text="Uploaded"
  check-color="success"
  v-model="..."
/>
```

### `:text`

The text to display in front of the switch.

```ts
interface Props {
  text?: string
}
```

```vue-html
<SInputSwitch text="Turn on this feature" v-model="true" />
```

### `:color`

The background color for the switch. The default is `info`.

```ts
interface Props {
  color?: 'info' | 'success' | 'warning' | 'danger'
}
```

```vue-html
<SInputSwitch color="success" v-model="true" />
```

### `:disabled`

Mark input as disabled. When this prop is set, users may not be able to focus the element not trigger any events.

```ts
interface Props {
  disabled?: boolean
}
```

```vue-html
<SInputSwitch disabled v-model="..." />
```

### `:value`

Sets the input value. When `model-value` prop is set (e.g. via `v-model` directive), this prop gets ignored.

```ts
interface Props {
  value?: boolean
}
```

```vue-html
<SInputSwitch :value="true" />
```

### `:model-value`

The `v-model` binding for the input.

```ts
interface Props {
  modelValue?: boolean
}
```

```vue-html
<SInputSwitch v-model="true" />
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
<SInputSwitch v-model="..." :validation="validation" />
```

### `:hide-error`

Stop showing validation error message even when there are errors. This prop will not prevent the error color from appearing.

```ts
interface Props {
  hideError?: boolean
}
```

```vue-html
<SInputSwitch
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
<SInputSwitch label="Name" v-model="...">
  <template #info>
    Learn more about this field <SLink href="...">here</SLink>.
  </template>
</SInputSwitch>
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

### "Off" state styles

You may customize the style when the switch is "off" by overriding the following CSS variables. Styles when the switch is "on" are defined by the `:color` prop.

```css
:root {
  --input-switch-toggle-color: var(--c-neutral-1);
  --input-switch-bg-color: var(--c-mute);
  --input-switch-disabled-toggle-color: var(--c-gray);
  --input-switch-disabled-bg-color: var(--c-mute);
}

.dark {
  --input-switch-bg-color: var(--c-bg-elv-1);
  --input-switch-disabled-bg-color: var(--c-mute);
}
```

### Global input styles

You may customize the various styles of the component via global input related CSS variables. Please refer to [Styles: Input Styles](../styles/input-styles) page.
