# SControl

`<SControl>` is a component to create sets of control actions.

## Import

```ts
import SControl from '@globalbrain/sefirot/lib/components/SControl.vue'
import SControlActionBar from '@globalbrain/sefirot/lib/components/SControlActionBar.vue'
import SControlActionBarButton from '@globalbrain/sefirot/lib/components/SControlActionBarButton.vue'
import SControlActionBarClose from '@globalbrain/sefirot/lib/components/SControlActionBarClose.vue'
import SControlActionBarCollapse from '@globalbrain/sefirot/lib/components/SControlActionBarCollapse.vue'
import SControlActionMenu from '@globalbrain/sefirot/lib/components/SControlActionMenu.vue'
import SControlButton from '@globalbrain/sefirot/lib/components/SControlButton.vue'
import SControlCenter from '@globalbrain/sefirot/lib/components/SControlCenter.vue'
import SControlInputSearch from '@globalbrain/sefirot/lib/components/SControlInputSearch.vue'
import SControlLeft from '@globalbrain/sefirot/lib/components/SControlLeft.vue'
import SControlPagination from '@globalbrain/sefirot/lib/components/SControlPagination.vue'
import SControlRight from '@globalbrain/sefirot/lib/components/SControlRight.vue'
import SControlText from '@globalbrain/sefirot/lib/components/SControlText.vue'
```

### Mixins

`<SControl>` serise are all packed in `Control` mixin, and also it is a part of `Fundamental` mixin.

```ts
import { mixin as controlMixin } from '@globalbrain/sefirot/lib/mixins/Control'

app.use(controlMixin)
```

## Usage

`<SControl>` is a set of multiple components and you can combine them to create a horizontal control bar.

A simple example would be creating "Cancel" and "Submit" form footer. This component will display 2 buttons aligned to the right.

```vue-html
<SControl>
  <SControlRight>
    <SControlButton label="Cancel" />
    <SControlButton mode="info" label="Submit" />
  </SControlRight>
</SControl>
```

### Controlling layout

Use `<SControlLeft>`, `<SControlCenter>`, and `<SControlRight>` to align the content to the left, center, and right. Usually, you should always wrap the content within one of these components even if you only have single section.

```vue-html
<SControl>
  <SControlLeft>
    <SControlButton label="Button" />
  </SControlLeft>
</SControl>
```

### Adding actions

Place action components such as `<SControlButton>` and `<SControlActionBar>` to add actions.

```vue-html
<SControl>
  <SControlRight>
    <SControlButton label="Cancel" />
    <SControlButton mode="info" label="Submit" />
  </SControlRight>
</SControl>
```

### Combining with `<SCard>`

When `<SControl>` is used inside [`<SCard>`](card), it will inherit the size option from the parent card compoennt and automatically adjust the size of control buttons. This is useful when adding header and footer to the card.

```vue-html
<SCard>
  <ScardBlock class="body">
    <!-- ... -->
  </ScardBlock>
  <SCardBlock size="small" class="s-px-24">
    <SControl>
      <SControlRight>
        <SControlButton label="Cancel" />
        <SControlButton mode="info" label="Submit" />
      </SControlRight>
    </SControl>
  </SCardBlock>
</SCard>
```

## `<SControl>`

The root component of control series. All the other components should be wrapped within it.

```vue-html
<SControl>
  <!-- ... -->
</SControl>
```

## `<SControlLeft>`

Aligns nested components to the left.

```vue-html
<SControl>
  <SControlLeft>
    <!-- ... -->
  </SControlLeft>
</SControl>
```

## `<SControlCenter>`

Aligns nested components to the center.

```vue-html
<SControl>
  <SControlCenter>
    <!-- ... -->
  </SControlCenter>
</SControl>
```

## `<SControlRight>`

Aligns nested components to the right.

```vue-html
<SControl>
  <SControlRight>
    <!-- ... -->
  </SControlRight>
</SControl>
```

## `<SControlButton>`

The component is almost identical to [`<SButton>`](button) and you may use almost all the props available in `<SButton>`. However, `<SControlButton>` will automatically adjust its size based on `<SControl>` usage so remember to always use `<SControlButton>` instead of `<SButton>`.

```ts
import {
  type Mode,
  type Tooltip,
  type Type
} from '@globalbrain/sefirot/lib/components/SButton.vue'

interface Props {
  tag?: string
  type?: Type
  mode?: Mode
  icon?: Component
  iconMode?: Mode
  label?: string
  labelMode?: Mode
  href?: string
  loading?: boolean
  disabled?: boolean
  tooltip?: string | Tooltip
}
```

```ts
interface Emits {
  click: []
}
```

```vue-html
<SControl>
  <SControlRight>
    <SControlButton label="Cancel" @click="close" />
    <SControlButton mode="info" label="Submit" @click="submit" />
  </SControlRight>
</SControl>
```

## `<SControlActionBar>`

A container for multiple icon based action buttons. This is the root component for action bar series.

```vue-html
<SControl>
  <SControlRight>
    <SControlActionBar>
      <SControlActionBarClose />
    </SControlActionBar>
  </SControlRight>
</SControl>
```

## `<SControlActionBarButton>`

A generic action bar button.

```ts
import SButton, {
  type Mode,
  type Tooltip,
  type Type
} from '@globalbrain/sefirot/lib/components/SButton.vue'

interface Props {
  as?: string
  icon?: Component
  href?: string
  disabled?: boolean
  tooltip?: string | Tooltip
}
```

```ts
interface Emits {
  click: []
}
```

```vue
<script setup lang="ts">
import IconNotePencil from '~icons/ph/note-pencil-bold'
import IconTrash from '~icons/ph/trash-bold'
</script>

<template>
  <SControl>
    <SControlRight>
      <SControlActionBar>
        <SControlActionBarButton :icon="IconNotePencil" />
        <SControlActionBarButton :icon="IconTrash" />
      </SControlActionBar>
    </SControlRight>
  </SControl>
</template>
```

## `<SControlActionBarClose>`

A helper component to create a close (X) button. This is exactly the same as passing X icon to `<SControlActionBarButton>`.

```ts
interface Props {
  as?: string
}
```

```ts
interface Emits {
  click: []
}
```

```vue-html
<SControl>
  <SControlRight>
    <SControlActionBar>
      <SControlActionBarClose />
    </SControlActionBar>
  </SControlRight>
</SControl>
```

## `<SControlActionBarCollapse>`

A special component to add a collapse button, and its actual collapse behavior. This component only makes sense when used inside `<SCard>` component. Add this on 

```ts
interface Props {
  as?: string
  collapsed?: boolean
}
```

```ts
interface Emits {
  click: []
}
```

```vue-html
<SCard>
  <SCardBlock size="small" class="s-px-24">
    <SControl>
      <SControlRight>
        <SControlActionBar>
          <SControlActionBarCollapse />
        </SControlActionBar>
      </SControlRight>
    </SControl>
  </SCardBlock>
</SCard>
```

## `<SControlInputSearch>`

A helper component that creates `<SInputText>` component with magnifying glass icon. Useful for adding search feature.

```ts
interface Props {
  placeholder?: string
  unitAfter?: any
  textColor?: TextColor | ((value: string | null) => TextColor)
  align?: Align
  disabled?: boolean
  value?: string | null
  modelValue?: string | null
  displayValue?: string | null
  validation?: Validatable
}
```

```ts
interface Emits {
  'update:model-value': [value: string | null]
  'input': [value: string | null]
  'blur': [value: string | null]
  'enter': [value: string | null]
}
```

```vue-html
<SControl>
  <SControlLeft>
    <SControlInputSearch
      placeholder="Search everything..."
      v-model="query"
    />
  </SControlLeft>
</SControl>
```

## `<SControlPagination>`

A component to create pagination control.

```ts
import { type Size } from '@globalbrain/sefirot/lib/components/SPagination.vue'

interface Props {
  size?: Size
  disabled?: boolean
  total: number
  page: number
  perPage: number
}
```

```ts
interface Emits {
  'update:model-value': [value: string | null]
  'input': [value: string | null]
  'blur': [value: string | null]
  'enter': [value: string | null]
}
```

```vue-html
<SControl>
  <SControlRight>
    <SControlPagination
      :total="meta.total"
      :page="meta.page"
      :perPage="meta.perPage"
      @prev="prev"
      @next="next"
    />
  </SControlRight>
</SControl>
```

## `<SControlText>`

Add static text to the control bar.

```vue-html
<SControl>
  <SControlRight>
    <SControlText>
      Hello, world!
    </SControlText>
  </SControlRight>
</SControl>
```
