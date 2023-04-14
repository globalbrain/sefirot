<script setup lang="ts">
import SPill from 'sefirot/components/SPill.vue'

const modes = ['neutral', 'mute', 'info', 'success', 'warning', 'danger'] as const
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

## Usage

Import `<SPill>` component and it's good to go. All props are optional.

```vue
<script setup lang="ts">
import SPill from '@globalbrain/sefirot/lib/components/SPill.vue'
</script>

<template>
  <SPill label="Pill" />
</template>
```

## Difference from SState

The [`<SState>`](state) is different from `<SPill>` where `<SPill>` should be used to list certain types of items for the object, but `<SState>` is used to indicate the "State" of the object.

For example, `<SState>` should be used for things like "Status" (Open, In progress, Completed, etc.).

`<SPill>` on the other hand should be used for things like "Tag" (List of available items, User's roles, etc.)

## Props

Here are the list of props you may pass to the component.

### `:tag`

Defines the HTML tag for the pill. Any value passed to this prop will used as `<component :is="tag">`. The default tag for the button is `span`. The `tag` prop will take precedence even when the `clickable` prop is set.

```ts
interface Props {
  tag?: string
}
```

```vue-html
<SPill tag="div" label="Pill" />
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

Defines how the pill look. The default is `dimm`.

```ts
interface Props {
  type?: 'dimm' | 'fill'
}
```

```vue-html
<SPill type="fill" label="Pill" />
```

### `:mode`

Defines the color of the pill. The default is `neutral`.

```ts
interface Props {
  mode?: Mode
}

type Mode =
  | 'neutral'
  | 'mute'
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

## Events

Here are the list of events the component may emit.

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
  --pill-dimm-neutral-border-color: var(--c-divider-1);
  --pill-dimm-neutral-text-color: var(--c-text-1);
  --pill-dimm-neutral-bg-color: var(--c-mute);
  --pill-dimm-neutral-hover-bg-color: var(--c-mute-dimm-1);
  --pill-dimm-neutral-active-bg-color: var(--c-mute-dimm-2);

  --pill-dimm-mute-border-color: var(--c-divider-1);
  --pill-dimm-mute-text-color: var(--c-text-2);
  --pill-dimm-mute-bg-color: var(--c-mute);
  --pill-dimm-mute-hover-bg-color: var(--c-mute-dimm-1);
  --pill-dimm-mute-active-bg-color: var(--c-mute-dimm-2);

  --pill-dimm-info-border-color: var(--c-info-light);
  --pill-dimm-info-text-color: var(--c-info-light);
  --pill-dimm-info-bg-color: var(--c-info-dimm-1);
  --pill-dimm-info-hover-bg-color: var(--c-info-dimm-2);
  --pill-dimm-info-active-bg-color: var(--c-info-dimm-3);

  --pill-dimm-success-border-color: var(--c-success-light);
  --pill-dimm-success-text-color: var(--c-success-light);
  --pill-dimm-success-bg-color: var(--c-success-dimm-1);
  --pill-dimm-success-hover-bg-color: var(--c-success-dimm-2);
  --pill-dimm-success-active-bg-color: var(--c-success-dimm-3);

  --pill-dimm-warning-border-color: var(--c-warning-light);
  --pill-dimm-warning-text-color: var(--c-warning-light);
  --pill-dimm-warning-bg-color: var(--c-warning-dimm-1);
  --pill-dimm-warning-hover-bg-color: var(--c-warning-dimm-2);
  --pill-dimm-warning-active-bg-color: var(--c-warning-dimm-3);

  --pill-dimm-danger-border-color: var(--c-danger-light);
  --pill-dimm-danger-text-color: var(--c-danger-light);
  --pill-dimm-danger-bg-color: var(--c-danger-dimm-1);
  --pill-dimm-danger-hover-bg-color: var(--c-danger-dimm-2);
  --pill-dimm-danger-active-bg-color: var(--c-danger-dimm-3);

  --pill-fill-neutral-border-color: transparent;
  --pill-fill-neutral-text-color: var(--c-text-inverse-1);
  --pill-fill-neutral-bg-color: var(--c-neutral-1);
  --pill-fill-neutral-hover-bg-color: var(--c-neutral-2);
  --pill-fill-neutral-active-bg-color: var(--c-neutral-3);

  --pill-fill-mute-border-color: transparent;
  --pill-fill-mute-text-color: var(--c-text-1);
  --pill-fill-mute-bg-color: var(--c-mute);
  --pill-fill-mute-hover-bg-color: var(--c-mute-dimm-1);
  --pill-fill-mute-active-bg-color: var(--c-mute-dimm-2);

  --pill-fill-info-border-color: transparent;
  --pill-fill-info-text-color: var(--c-text-dark-1);
  --pill-fill-info-bg-color: var(--c-info);
  --pill-fill-info-hover-bg-color: var(--c-info-dark);
  --pill-fill-info-active-bg-color: var(--c-info-darker);

  --pill-fill-success-border-color: transparent;
  --pill-fill-success-text-color: var(--c-text-dark-1);
  --pill-fill-success-bg-color: var(--c-success);
  --pill-fill-success-hover-bg-color: var(--c-success-dark);
  --pill-fill-success-active-bg-color: var(--c-success-darker);

  --pill-fill-warning-border-color: transparent;
  --pill-fill-warning-text-color: var(--c-text-dark-1);
  --pill-fill-warning-bg-color: var(--c-warning);
  --pill-fill-warning-hover-bg-color: var(--c-warning-dark);
  --pill-fill-warning-active-bg-color: var(--c-warning-darker);

  --pill-fill-danger-border-color: transparent;
  --pill-fill-danger-text-color: var(--c-text-dark-1);
  --pill-fill-danger-bg-color: var(--c-danger);
  --pill-fill-danger-hover-bg-color: var(--c-danger-dark);
  --pill-fill-danger-active-bg-color: var(--c-danger-darker);
}
```
