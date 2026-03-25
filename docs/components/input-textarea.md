---
outline: deep
---

<script setup lang="ts">
import { ref } from 'vue'
import SInputTextarea from 'sefirot/components/SInputTextarea.vue'

const value = ref<string | null>(null)
</script>

# SInputTextarea

`<SInputTextarea>` is a multiline text input.

<Showcase
  path="/components/SInputTextarea.vue"
  story="/stories-components-sinputtextarea-01-playground-story-vue"
>
  <div style="max-width: 480px;">
    <SInputTextarea
      v-model="value"
      label="Description"
      placeholder="Write your message here"
    />
  </div>
</Showcase>

## Usage

Use `v-model` for the textarea value.

```vue
<script setup lang="ts">
import { ref } from 'vue'
import SInputTextarea from '@globalbrain/sefirot/lib/components/SInputTextarea.vue'

const message = ref<string | null>(null)
</script>

<template>
  <SInputTextarea
    v-model="message"
    name="message"
    label="Message"
    placeholder="Write your message here"
  />
</template>
```

## Anatomy

- Label row: Optional `label`, `info`, `note`.
- Input box: The textarea itself, including disabled, error, warning, fill mode (`rows="fill"`), and auto-resize behavior.
- Toolbar: Optional top row for the write/preview toggle and `#actions` content.
- Help area: Validation errors, warnings, and helper text rendered below the field.

## `<SInputTextarea>`

`<SInputTextarea>` is the root component. It accepts the shared input-base props plus textarea-specific layout and preview props.

### Props

```ts
import type { Component } from 'vue'
import type { Validatable } from 'sefirot/composables/Validation'

interface Props {
  /**
   * Controls the field sizing and typography.
   *
   * @default 'small'
   */
  size?: 'sm' | 'md' | 'mini' | 'small' | 'medium'

  /**
   * Used for the textarea `id` and the label `for` attribute.
   */
  name?: string

  /**
   * Optional field label shown above the textarea.
   */
  label?: string

  /**
   * Tooltip text shown next to the label.
   * Use the `#info` slot for richer content.
   */
  info?: string

  /**
   * Secondary inline text displayed next to the label.
   */
  note?: string

  /**
   * Helper text shown below the field.
   */
  help?: string

  /**
   * Status indicator displayed at the right edge of the label row.
   */
  checkIcon?: Component
  checkText?: string

  /**
   * Color of the status indicator.
   *
   * @default 'neutral'
   */
  checkColor?: 'neutral' | 'mute' | 'info' | 'success' | 'warning' | 'danger'

  /**
   * Validation state object used to show error styling and error text.
   */
  validation?: Validatable

  /**
   * Warning text shown below the field.
   */
  warning?: string

  /**
   * Hides the validation message while preserving error styling.
   *
   * @default false
   */
  hideError?: boolean

  /**
   * Hides the warning message.
   *
   * @default false
   */
  hideWarning?: boolean

  /**
   * Placeholder text for the textarea.
   */
  placeholder?: string

  /**
   * Disables the textarea.
   *
   * @default false
   */
  disabled?: boolean

  /**
   * Sets the textarea tabindex.
   */
  tabindex?: 0 | -1 | number

  /**
   * Sets the initial row count or makes the field fill the available height.
   * Use `'fill'` only inside a flex container with a defined height.
   *
   * @default 3
   */
  rows?: number | 'fill'

  /**
   * Enables automatic height growth based on content.
   * `true` removes the max height, and a number sets the maximum row count
   * before scrolling starts.
   *
   * @default false
   */
  autoResize?: boolean | number

  /**
   * Uncontrolled value. Ignored when `modelValue` is provided.
   */
  value?: string | null

  /**
   * Controlled value used by `v-model`.
   */
  modelValue?: string | null

  /**
   * Enables write/preview mode. Return an HTML string for the preview panel.
   */
  preview?: (value: string | null) => string

  /**
   * Custom label for the preview toggle.
   */
  previewLabel?: string

  /**
   * Custom label for the write toggle.
   */
  writeLabel?: string
}
```

### Slots

- `actions`: Optional toolbar actions rendered on the right side of the control row. Hidden while preview mode is active.
- `info`: Rich tooltip content that overrides the plain `info` prop.

### Events

```ts
interface Emits {
  'update:model-value': [value: string | null]
  input: [value: string | null]
  blur: [value: string | null]
}
```

- `update:model-value`: Emitted on every input and again on blur with the latest value.
- `input`: Emitted whenever the textarea value changes.
- `blur`: Emitted when the field loses focus. This also calls `validation?.$touch()`.

### Special use cases

Use `:preview` to build a write/preview editor. When you also provide `#actions`, the component renders a toolbar above the textarea.

```vue
<script setup lang="ts">
import { ref } from 'vue'
import SButton from '@globalbrain/sefirot/lib/components/SButton.vue'
import SInputTextarea from '@globalbrain/sefirot/lib/components/SInputTextarea.vue'
import { useMarkdown } from '@globalbrain/sefirot/lib/composables/Markdown'

const body = ref('')
const renderMarkdown = useMarkdown()

function preview(value: string | null) {
  return value ? renderMarkdown(value) : '<p>Nothing to preview</p>'
}
</script>

<template>
  <SInputTextarea
    v-model="body"
    label="Body"
    :rows="8"
    :preview
    preview-label="Preview"
    write-label="Write"
  >
    <template #actions>
      <SButton type="text" size="sm" mode="mute" label="Attach link" />
    </template>
  </SInputTextarea>
</template>
```

### Behavior notes

- `modelValue` takes precedence over `value`.
- With `autoResize` enabled, `rows` becomes the minimum visible height.
- `rows="fill"` makes the field grow to the available height, so the parent should be a flex container with a constrained height.
- The string returned from `preview()` is rendered with `v-html`, so sanitize untrusted content before returning it.
