<script setup lang="ts">
import { ref } from 'vue'
import SInputAddon from 'sefirot/components/SInputAddon.vue'
import SInputText from 'sefirot/components/SInputText.vue'

const input = ref<string | null>(null)
</script>

# SInputAddon

`<SInputAddon>` is a special component that can be used to add extra label or action to other input.

<Showcase
  path="/components/SInputText.vue"
  story="/stories-components-sinputtext-02-addons-story-vue"
>
  <SInputText placeholder="johndoe" v-model="input">
    <template #addon-before>
      <SInputAddon label="@" :clickable="false" />
    </template>
  </SInputText>
</Showcase>

## Usage

In order to use `<SInputAddon>`, you must inject it through slots. Currently, the supported components are listed below.

- `<SInputText>`
- [`<SInputNumber>`](/components/input-number)

You may choose the position of the addon to be injected using the slot name either `#addon-before` or `#addon-after`.

```vue
<script setup lang="ts">
import { ref } from 'vue'
import SInputAddon from '@globalbrain/sefirot/lib/components/SInputAddon.vue'
import SInputText from '@globalbrain/sefirot/lib/components/SInputText.vue'

const input = ref<string | null>(null)
</script>

<template>
  <SInputNumber placeholder="johndoe" v-model="input">
    <!-- Inject addon before the input box. -->
    <template #addon-before>
      <SInputAddon label="@" />
    </template>

    <!-- Inject addon after the input box. -->
    <template #addon-after>
      <SInputAddon label="@" />
    </template>
  </SInputNumber>
</template>
```

## Props

Here are the list of props you may pass to the component.

### `:label`

Defines the label of the addon button.

```ts
interface Props {
  label?: string | Icon
}
```

```vue-html
<SInputAddon label="@" />
```

### `:clickable`

Defines whether the button should be clickable. Defaults to `true`.

```ts
interface Props {
  clickable?: boolean
}
```

```vue-html
<SInputAddon label="@" :clickable="false" />
```

### `:dropdown`

Defines dropdown option. When this prop is set, the dropdown will pop up when user clicks the addon button. In addition, if `:label` is not defined, the selected option's label will be used for label value.

```ts
import { DropdownSection } from '@globalbrain/sefirot/lib/composables/Dropdown'

interface Props {
  dropdown?: DropdownSection[]
}
```

```vue
<script setup lang="ts">
import { createDropdown } from '@globalbrain/sefirot/lib/composables/Dropdown'

const dropdown = createDropdown([
  {
    type: 'filter',
    selected: 1,
    options: [
      { label: 'Item 01', value: 1, onClick: () => {} },
      { label: 'Item 02', value: 2, onClick: () => {} }
    ]
  }
])
</script>

<template>
  <SInputAddon :dropdown="dropdown" />
</template>
```

### `:dropdown-caret`

Whether to show caret icon when `:dropdown` is defined. Defaults to `true`.

```ts
interface Props {
  dropdownCaret?: boolean
}
```

```vue-html
<SInputAddon :dropdown="dropdown" :dropdown-caret="false" />
```

### `:dropdown-position`

Fix the dropdown dialog position. If it's not defined, the dialog will be placed based on window space.

```ts
interface Props {
  dropdowpPosition?: 'top' | 'bottom'
}
```

```vue-html
<SInputAddon :dropdown="dropdown" :dropdown-position="bottom" />
```

### `:disabled`

Disable the addon action. When this prop is set, no events are emitted.

```ts
interface Props {
  disabled?: boolean
}
```

```vue-html
<SInputAddon label="Button" disabled />
```

## Events

Here are the list of events the component may emit.

### `@click`

Emits when the user clicks the addon button. It will not be emitted when `:clickable` is set to `false`, or `:disabled` is set.

```ts
interface Emits {
  (e: 'click'): void
}
```
