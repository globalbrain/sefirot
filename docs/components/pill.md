<script setup lang="ts">
import SPill from 'sefirot/components/SPill.vue'

const modes = ['default', 'mute', 'neutral', 'info', 'success', 'warning', 'danger'] as const
</script>

# SPill

`<SPill>` is a common pill component.

<Showcase
  path="/components/SPill.vue"
  story="/stories-components-spill-01-playground-story-vue"
>
  <div class="flex flex-wrap gap-12">
    <SPill v-for="m in modes" :key="m" :mode="m" label="Pill" />
  </div>
</Showcase>

## Overview

Use this component to mark some objects. Fpr example. `<SPill>` can be used to tag certain object, such as "Important", "Urgent", "High priority", etc.

### Difference from SState

The [`<SState>`](state) is different from `<SPill>` where `<SPill>` should be used to list certain types of items for the object, but `<SState>` is used to indicate the "State" of the object.

For example, `<SState>` should be used for things like "Status" (Open, In progress, Completed, etc.).

`<SPill>` on the other hand should be used for things like "Tag" (List of available items, User's roles, etc.)

## Import

```ts
import SPill from '@globalbrain/sefirot/lib/components/SPill.vue'
```

## Usage

Import `<SPill>` component and it's good to go. All props are optional.

```vue-html
<SPill label="Pill" />
```

## Props

### `:as`

Defines the HTML tag for the pill. Any value passed to this prop will used as `<component :is="as">`. The default tag for the button is `span`. The `tag` prop will take precedence even when the `clickable` prop is set.

```ts
interface Props {
  // @default 'span' | 'button'
  as?: string
}
```

```vue-html
<SPill as="div" label="Pill" />
```

### `:size`

Defines the size of the pill. The default is `small`.

```ts
interface Props {
  size?: 'mini' | 'small' | 'medium' | 'large'
}
```

```vue-html
<SPill size="small" label="Pill" />
```

### `:type`

Defines how the pill look.

```ts
interface Props {
  // @default 'dimm'
  type?: 'dimm' | 'fill'
}
```

```vue-html
<SPill type="fill" label="Pill" />
```

### `:mode`

Defines the color of the pill.

```ts
interface Props {
  // @default 'default'
  mode?: Mode
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
<SPill mode="neutral" label="Pill" />
```

### `:label`

Defines the label text of the pill.

```ts
interface Props {
  label?: string
}
```

```vue-html
<SPill label="Pill" />
```

### `:clickable`

Mark pill clickable. When this prop is set, an user will be able to click the pill and the component will emit `click` event. Also, when this prop is set, the `button` HTML tag will be used instead of `span` unless `tag` prop is defined.

```ts
interface Props {
  clickable?: boolean
}
```

```vue-html
<SPill label="Button" clickable />
```

```vue-html
<SPill tag="div" label="Pill" />
```

## Events

### `@click`

Emits when an user clicks the button. This event will only be emitted when the `clickable` prop is set to `true`.

```ts
interface Emits {
  (e: 'click'): void
}
```

## Styles

You may customize the styles by overriding `--pill` prefixed CSS variables.

### Variant styles

The component has several different styles based on its type and color combination defined via the `type` and the `mode` prop. You may override the styles for each variation of buttons using the following CSS variables.

```css
:root {
  --pill-dimm-default-border-color: var(--c-border-mute-1);
  --pill-dimm-default-text-color: var(--c-text-1);
  --pill-dimm-default-bg-color: var(--c-bg-mute-1);
  --pill-dimm-default-hover-bg-color: var(--c-bg-mute-2);
  --pill-dimm-default-active-bg-color: var(--c-bg-mute-3);

  --pill-dimm-mute-border-color: var(--c-border-mute-1);
  --pill-dimm-mute-text-color: var(--c-text-2);
  --pill-dimm-mute-bg-color: var(--c-bg-mute-1);
  --pill-dimm-mute-hover-bg-color: var(--c-bg-mute-2);
  --pill-dimm-mute-active-bg-color: var(--c-bg-mute-3);

  --pill-dimm-neutral-border-color: var(--c-neutral-1);
  --pill-dimm-neutral-text-color: var(--c-text-inverse-1);
  --pill-dimm-neutral-bg-color: var(--c-neutral-1);
  --pill-dimm-neutral-hover-bg-color: var(--c-neutral-2);
  --pill-dimm-neutral-active-bg-color: var(--c-neutral-3);

  --pill-dimm-info-border-color: var(--c-border-info-1);
  --pill-dimm-info-text-color: var(--c-text-info-1);
  --pill-dimm-info-bg-color: var(--c-bg-info-dimm-a1);
  --pill-dimm-info-hover-bg-color: var(--c-bg-info-dimm-a2);
  --pill-dimm-info-active-bg-color: var(--c-bg-info-dimm-a2);

  --pill-dimm-success-border-color: var(--c-border-success-1);
  --pill-dimm-success-text-color: var(--c-text-success-1);
  --pill-dimm-success-bg-color: var(--c-bg-success-dimm-a1);
  --pill-dimm-success-hover-bg-color: var(--c-bg-success-dimm-a2);
  --pill-dimm-success-active-bg-color: var(--c-bg-success-dimm-a2);

  --pill-dimm-warning-border-color: var(--c-border-warning-1);
  --pill-dimm-warning-text-color: var(--c-text-warning-1);
  --pill-dimm-warning-bg-color: var(--c-bg-warning-dimm-a1);
  --pill-dimm-warning-hover-bg-color: var(--c-bg-warning-dimm-a2);
  --pill-dimm-warning-active-bg-color: var(--c-bg-warning-dimm-a2);

  --pill-dimm-danger-border-color: var(--c-border-danger-1);
  --pill-dimm-danger-text-color: var(--c-text-danger-1);
  --pill-dimm-danger-bg-color: var(--c-bg-danger-dimm-a1);
  --pill-dimm-danger-hover-bg-color: var(--c-bg-danger-dimm-a2);
  --pill-dimm-danger-active-bg-color: var(--c-bg-danger-dimm-a2);

  --pill-fill-default-border-color: transparent;
  --pill-fill-default-text-color: var(--c-text-1);
  --pill-fill-default-bg-color: var(--c-bg-mute-1);
  --pill-fill-default-hover-bg-color: var(--c-bg-mute-2);
  --pill-fill-default-active-bg-color: var(--c-bg-mute-3);

  --pill-fill-mute-border-color: transparent;
  --pill-fill-mute-text-color: var(--c-text-2);
  --pill-fill-mute-bg-color: var(--c-bg-mute-1);
  --pill-fill-mute-hover-bg-color: var(--c-bg-mute-2);
  --pill-fill-mute-active-bg-color: var(--c-bg-mute-3);

  --pill-fill-neutral-border-color: transparent;
  --pill-fill-neutral-text-color: var(--c-text-inverse-1);
  --pill-fill-neutral-bg-color: var(--c-neutral-1);
  --pill-fill-neutral-hover-bg-color: var(--c-neutral-2);
  --pill-fill-neutral-active-bg-color: var(--c-neutral-3);

  --pill-fill-info-border-color: transparent;
  --pill-fill-info-text-color: var(--c-white-1);
  --pill-fill-info-bg-color: var(--c-bg-info-1);
  --pill-fill-info-hover-bg-color: var(--c-bg-info-2);
  --pill-fill-info-active-bg-color: var(--c-bg-info-3);

  --pill-fill-success-border-color: transparent;
  --pill-fill-success-text-color: var(--c-white-1);
  --pill-fill-success-bg-color: var(--c-bg-success-1);
  --pill-fill-success-hover-bg-color: var(--c-bg-success-2);
  --pill-fill-success-active-bg-color: var(--c-bg-success-3);

  --pill-fill-warning-border-color: transparent;
  --pill-fill-warning-text-color: var(--c-white-1);
  --pill-fill-warning-bg-color: var(--c-bg-warning-1);
  --pill-fill-warning-hover-bg-color: var(--c-bg-warning-2);
  --pill-fill-warning-active-bg-color: var(--c-bg-warning-3);

  --pill-fill-danger-border-color: transparent;
  --pill-fill-danger-text-color: var(--c-white-1);
  --pill-fill-danger-bg-color: var(--c-bg-danger-1);
  --pill-fill-danger-hover-bg-color: var(--c-bg-danger-2);
  --pill-fill-danger-active-bg-color: var(--c-bg-danger-3);
}
```
