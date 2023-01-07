<script setup lang="ts">
import SButton from 'sefirot/components/SButton.vue'

const modes = ['neutral', 'mute', 'info', 'success', 'warning', 'danger'] as const
</script>

# SButton

`<SButton>` is a common button component.

<Showcase
  path="/components/SButton.vue"
  story="/stories-components-sbutton-01-playground-story-vue"
>
  <div class="flex flex-wrap gap-12">
    <SButton v-for="m in modes" :key="m" :mode="m" label="Button" />
  </div>
</Showcase>

## Usage

Import `<SButton>` component and it's good to go. All props are optional.

```vue
<script setup lang="ts">
import SButton from '@globalbrain/sefirot/lib/components/SButton.vue'
</script>

<template>
  <SButton label="Button" />
</template>
```

## Props

Here are the list of props you may pass to the component.

### `tag`

Defines how the HTML tag for the button. Any value passed to this prop will used as `<component :is="tag">`. The default tag for the button is `button`. The `tag` prop will take precedence even when the `href` prop is set.

```ts
interface Props {
  tag?: string
}
```

```vue
<SButton tag="div" label="Button" />
```

### `size`

Defines the size of the button. The default is `medium`.

```ts
interface Props {
  size?: Size
}

type Size =
  | 'mini'
  | 'small'
  | 'medium'
  | 'large'
  | 'jumbo'
```

```vue
<SButton size="small" label="Button" />
```

### `type`

Defines how the button look. The default is `fill`.

```ts
interface Props {
  type?: Type
}

type Size = 'fill' | 'outline' | 'text'
```

```vue
<SButton type="fill" label="Button" />
```

### `mode`

Defines the color of the button. The default is `neutral`.

```ts
interface Props {
  mode?: Mode
}

type Mode =
  | 'neutral'
  | 'mute'
  | 'white'
  | 'black'
  | 'info'
  | 'success'
  | 'warning'
  | 'danger'
```

```vue
<SButton mode="neutral" label="Button" />
```

### `label`

Defines the label text of the button.

```ts
interface Props {
  label?: string
}
```

```vue
<SButton label="Button" />
```

### `icon`

Prepend the given icon to the button. You may pass any `@iconify-icons` icons.

```ts
interface Props {
  label?: string
}
```

```vue
<script setup lang="ts">
import IconCheckCircle from '@iconify-icons/ph/check-circle-bold'
</script>

<template>
  <SButton :icon="IconCheckCircle" label="Button" />
</template>
```

### `href`

The href attribute to be used in for link. When this prop is set, the button element will use `SLink` component under the hood. However, when `tag` prop is set it will take the precedence.

```ts
interface Props {
  label?: string
}
```

```vue
<SButton label="Button" href="https://example.com" />
```

### `rounded`

Make the button to have rounded corners.

```ts
interface Props {
  rounded?: boolean
}
```

```vue
<SButton label="Button" rounded />
```

### `block`

Set the button's display value to `display: block`. The default button display value is `display: inline-block`.

```ts
interface Props {
  block?: boolean
}
```

```vue
<SButton label="Button" block />
```

### `loading`

Display a loading spinner. While this prop is set to true, the `click` event will not be emitted.

```ts
interface Props {
  loading?: boolean
}
```

```vue
<SButton label="Button" loading />
```

### `disabled`

Mark button as disabled. It will dimm the color of the button, and prevent `hover` or `click` styles. While this prop is set to true, the `click` event will not be emitted.

```ts
interface Props {
  disabled?: boolean
}
```

```vue
<SButton label="Button" disabled />
```

## Events

Here are the list of events the component may emit.

### `click`

Emits when an user clicks the button. This event will not be emitted when the `loading` or the `disabled` prop is set to `true`.

```ts
interface Emits {
  (e: 'click'): void
}
```

## Styles

You may customize the styles by overriding `--button` prefixed CSS variables.

### Font size

Customize the font size of the button's label. The font size is different depending on the button's size defined by the `size` prop. You may override the font size for all button sizes, or customize them individually.

```css
:root {
  /**
   * Set the font size for all size of buttons. By default it's
   * undefined and size specific values defined below is used.
   */
  --button-font-size: undefined;

  /**
   * Set the font size of different `size` of buttons. When
   * `--button-font-size` is set, these values gets ignored.
   */
  --button-mini-font-size: 12px;
  --button-small-font-size: 14px;
  --button-medium-font-size: 14px;
  --button-large-font-size: 14px;
  --button-jumbo-font-size: 16px;
}
```

### Padding

You may control the padding the button has. Useful when you want to have wider `padding-left` and `padding-right` than the default.

```css
:root {
  /* e.g. --button-padding: 0 32px; */
  --button-padding: undefined;
}
```

### Variant styles

The component has several different styles based on its type and color combination defined via the `type` and the `mode` prop. You may override the styles for each variation of buttons using the following CSS variables.

```css
:root {
  --button-fill-neutral-border-color: transparent;
  --button-fill-neutral-text-color: var(--c-text-inverse-1);
  --button-fill-neutral-bg-color: var(--c-neutral-1);
  --button-fill-neutral-loader-color: var(--c-neutral-inverse-1);
  --button-fill-neutral-hover-bg-color: var(--c-neutral-2);
  --button-fill-neutral-active-bg-color: var(--c-neutral-3);
  --button-fill-neutral-disabled-border-color: transparent;
  --button-fill-neutral-disabled-text-color: var(--c-text-inverse-2);
  --button-fill-neutral-disabled-bg-color: var(--c-neutral-2);

  --button-fill-white-border-color: transparent;
  --button-fill-white-text-color: var(--c-text-light-1);
  --button-fill-white-bg-color: var(--c-neutral-dark-1);
  --button-fill-white-loader-color: var(--c-neutral-light-1);
  --button-fill-white-hover-bg-color: var(--c-neutral-dark-2);
  --button-fill-white-active-bg-color: var(--c-neutral-dark-3);
  --button-fill-white-disabled-border-color: transparent;
  --button-fill-white-disabled-text-color: var(--c-text-light-2);
  --button-fill-white-disabled-bg-color: var(--c-neutral-dark-2);

  --button-fill-black-border-color: transparent;
  --button-fill-black-text-color: var(--c-text-dark-1);
  --button-fill-black-bg-color: var(--c-neutral-light-1);
  --button-fill-black-loader-color: var(--c-neutral-dark-1);
  --button-fill-black-hover-bg-color: var(--c-neutral-light-2);
  --button-fill-black-active-bg-color: var(--c-neutral-light-3);
  --button-fill-black-disabled-border-color: transparent;
  --button-fill-black-disabled-text-color: var(--c-text-dark-2);
  --button-fill-black-disabled-bg-color: var(--c-neutral-light-2);

  --button-fill-mute-border-color: var(--c-divider-1);
  --button-fill-mute-text-color: var(--c-text-1);
  --button-fill-mute-bg-color: var(--c-mute);
  --button-fill-mute-loader-color: var(--c-neutral);
  --button-fill-mute-hover-bg-color: var(--c-mute-dark);
  --button-fill-mute-active-bg-color: var(--c-mute-darker);
  --button-fill-mute-disabled-border-color: var(--c-divider-2);
  --button-fill-mute-disabled-text-color: var(--c-text-2);
  --button-fill-mute-disabled-bg-color: var(--c-mute-dark);

  --button-fill-info-border-color: var(--c-info-light);
  --button-fill-info-text-color: var(--c-text-dark-1);
  --button-fill-info-bg-color: var(--c-info);
  --button-fill-info-loader-color: var(--c-white);
  --button-fill-info-hover-bg-color: var(--c-info-dark);
  --button-fill-info-active-bg-color: var(--c-info-darker);
  --button-fill-info-disabled-border-color: var(--c-info);
  --button-fill-info-disabled-text-color: var(--c-text-dark-2);
  --button-fill-info-disabled-bg-color: var(--c-info-dark);

  --button-fill-success-border-color: var(--c-success-light);
  --button-fill-success-text-color: var(--c-text-dark-1);
  --button-fill-success-bg-color: var(--c-success);
  --button-fill-success-loader-color: var(--c-white);
  --button-fill-success-hover-bg-color: var(--c-success-dark);
  --button-fill-success-active-bg-color: var(--c-success-darker);
  --button-fill-success-disabled-border-color: var(--c-success);
  --button-fill-success-disabled-text-color: var(--c-text-dark-2);
  --button-fill-success-disabled-bg-color: var(--c-success-dark);

  --button-fill-warning-border-color: var(--c-warning-light);
  --button-fill-warning-text-color: var(--c-text-dark-1);
  --button-fill-warning-bg-color: var(--c-warning);
  --button-fill-warning-loader-color: var(--c-white);
  --button-fill-warning-hover-bg-color: var(--c-warning-dark);
  --button-fill-warning-active-bg-color: var(--c-warning-darker);
  --button-fill-warning-disabled-border-color: var(--c-warning);
  --button-fill-warning-disabled-text-color: var(--c-text-dark-2);
  --button-fill-warning-disabled-bg-color: var(--c-warning-dark);

  --button-fill-danger-border-color: var(--c-danger-light);
  --button-fill-danger-text-color: var(--c-text-dark-1);
  --button-fill-danger-bg-color: var(--c-danger);
  --button-fill-danger-loader-color: var(--c-white);
  --button-fill-danger-hover-bg-color: var(--c-danger-dark);
  --button-fill-danger-active-bg-color: var(--c-danger-darker);
  --button-fill-danger-disabled-border-color: var(--c-danger);
  --button-fill-danger-disabled-text-color: var(--c-text-dark-2);
  --button-fill-danger-disabled-bg-color: var(--c-danger-dark);

  --button-outline-neutral-border-color: var(--c-neutral-1);
  --button-outline-neutral-text-color: var(--c-text-1);
  --button-outline-neutral-loader-color: var(--c-neutral-1);
  --button-outline-neutral-hover-bg-color: var(--c-neutral-dimm-1);
  --button-outline-neutral-active-bg-color: var(--c-neutral-dimm-2);
  --button-outline-neutral-disabled-border-color: var(--c-neutral-3);
  --button-outline-neutral-disabled-text-color: var(--c-text-2);

  --button-outline-white-border-color: var(--c-neutral-dark-1);
  --button-outline-white-text-color: var(--c-text-dark-1);
  --button-outline-white-loader-color: var(--c-neutral-dark-1);
  --button-outline-white-hover-bg-color: var(--c-neutral-dark-dimm-1);
  --button-outline-white-active-bg-color: var(--c-neutral-dark-dimm-2);
  --button-outline-white-disabled-border-color: var(--c-neutral-dark-3);
  --button-outline-white-disabled-text-color: var(--c-text-dark-2);

  --button-outline-black-border-color: var(--c-neutral-light-1);
  --button-outline-black-text-color: var(--c-text-light-1);
  --button-outline-black-loader-color: var(--c-neutral-light-1);
  --button-outline-black-hover-bg-color: var(--c-neutral-light-dimm-1);
  --button-outline-black-active-bg-color: var(--c-neutral-light-dimm-2);
  --button-outline-black-disabled-border-color: var(--c-neutral-light-3);
  --button-outline-black-disabled-text-color: var(--c-text-light-2);

  --button-outline-mute-border-color: var(--c-divider-1);
  --button-outline-mute-text-color: var(--c-text-2);
  --button-outline-mute-loader-color: var(--c-neutral-1);
  --button-outline-mute-hover-bg-color: var(--c-mute-dimm-1);
  --button-outline-mute-active-bg-color: var(--c-mute-dimm-2);
  --button-outline-mute-disabled-border-color: var(--c-divider-2);
  --button-outline-mute-disabled-text-color: var(--c-text-3);

  --button-outline-info-border-color: var(--c-info-light);
  --button-outline-info-text-color: var(--c-info-light);
  --button-outline-info-loader-color: var(--c-neutral-1);
  --button-outline-info-hover-bg-color: var(--c-info-dimm-1);
  --button-outline-info-active-bg-color: var(--c-info-dimm-2);
  --button-outline-info-disabled-border-color: var(--c-info-dark);
  --button-outline-info-disabled-text-color: var(--c-info-dark);

  --button-outline-success-border-color: var(--c-success-light);
  --button-outline-success-text-color: var(--c-success-light);
  --button-outline-success-loader-color: var(--c-neutral-1);
  --button-outline-success-hover-bg-color: var(--c-success-dimm-1);
  --button-outline-success-active-bg-color: var(--c-success-dimm-2);
  --button-outline-success-disabled-border-color: var(--c-success-dark);
  --button-outline-success-disabled-text-color: var(--c-success-dark);

  --button-outline-warning-border-color: var(--c-warning-light);
  --button-outline-warning-text-color: var(--c-warning-light);
  --button-outline-warning-loader-color: var(--c-neutral-1);
  --button-outline-warning-hover-bg-color: var(--c-warning-dimm-1);
  --button-outline-warning-active-bg-color: var(--c-warning-dimm-2);
  --button-outline-warning-disabled-border-color: var(--c-warning-dark);
  --button-outline-warning-disabled-text-color: var(--c-warning-dark);

  --button-outline-danger-border-color: var(--c-danger-light);
  --button-outline-danger-text-color: var(--c-danger-light);
  --button-outline-danger-loader-color: var(--c-neutral-1);
  --button-outline-danger-hover-bg-color: var(--c-danger-dimm-1);
  --button-outline-danger-active-bg-color: var(--c-danger-dimm-2);
  --button-outline-danger-disabled-border-color: var(--c-danger-dark);
  --button-outline-danger-disabled-text-color: var(--c-danger-dark);

  --button-text-neutral-text-color: var(--c-text-1);
  --button-text-neutral-hover-bg-color: var(--c-neutral-dimm-1);
  --button-text-neutral-active-bg-color: var(--c-neutral-dimm-2);
  --button-text-neutral-disabled-text-color: var(--c-text-2);

  --button-text-white-text-color: var(--c-text-dark-1);
  --button-text-white-hover-bg-color: var(--c-neutral-dark-dimm-1);
  --button-text-white-active-bg-color: var(--c-neutral-dark-dimm-2);
  --button-text-white-disabled-text-color: var(--c-text-dark-2);

  --button-text-black-text-color: var(--c-text-light-1);
  --button-text-black-hover-bg-color: var(--c-neutral-light-dimm-1);
  --button-text-black-active-bg-color: var(--c-neutral-light-dimm-2);
  --button-text-black-disabled-text-color: var(--c-text-light-2);

  --button-text-mute-text-color: var(--c-text-2);
  --button-text-mute-hover-bg-color: var(--c-mute-dimm-1);
  --button-text-mute-active-bg-color: var(--c-mute-dimm-2);
  --button-text-mute-disabled-text-color: var(--c-text-3);

  --button-text-info-text-color: var(--c-info-light);
  --button-text-info-hover-bg-color: var(--c-info-dimm-1);
  --button-text-info-active-bg-color: var(--c-info-dimm-2);
  --button-text-info-disabled-text-color: var(--c-info-dark);

  --button-text-success-text-color: var(--c-success-light);
  --button-text-success-hover-bg-color: var(--c-success-dimm-1);
  --button-text-success-active-bg-color: var(--c-success-dimm-2);
  --button-text-success-disabled-text-color: var(--c-success-dark);

  --button-text-warning-text-color: var(--c-warning-light);
  --button-text-warning-hover-bg-color: var(--c-warning-dimm-1);
  --button-text-warning-active-bg-color: var(--c-warning-dimm-2);
  --button-text-warning-disabled-text-color: var(--c-warning-dark);

  --button-text-danger-text-color: var(--c-danger-light);
  --button-text-danger-hover-bg-color: var(--c-danger-dimm-1);
  --button-text-danger-active-bg-color: var(--c-danger-dimm-2);
  --button-text-danger-disabled-text-color: var(--c-danger-dark);
}
```
