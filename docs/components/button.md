<script setup lang="ts">
import SButton from 'sefirot/components/SButton.vue'

const modes = ['default', 'neutral', 'info', 'success', 'warning', 'danger'] as const
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

### `:tag`

Defines the HTML tag for the button. The default tag is `'button'`. The `:tag` prop will take precedence even when the `:href` prop is set.

```ts
interface Props {
  tag?: string
}
```

```vue-html
<SButton tag="div" label="Button" />
```

### `:size`

Defines the size of the button. The default is `'medium'`.

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

```vue-html
<SButton size="small" label="Button" />
```

### `:type`

Defines the button appearance. The default is `'fill'`.

```ts
interface Props {
  type?: Type
}

type Type = 'fill' | 'outline' | 'text'
```

```vue-html
<SButton type="fill" label="Button" />
```

### `:mode`

Defines the color of the button. The default is `'default'`.

```ts
interface Props {
  mode?: Mode
}

type Mode =
  | 'default'
  | 'mute'
  | 'neutral'
  | 'white'
  | 'black'
  | 'info'
  | 'success'
  | 'warning'
  | 'danger'
```

```vue-html
<SButton mode="neutral" label="Button" />
```

### `:label`

Defines the label text of the button.

```ts
interface Props {
  label?: string
}
```

```vue-html
<SButton label="Button" />
```

### `:label-mode`

Defines the color of the button's label.

```ts
interface Props {
  labelMode?: Mode
}

type Mode =
  | 'default'
  | 'mute'
  | 'neutral'
  | 'white'
  | 'black'
  | 'info'
  | 'success'
  | 'warning'
  | 'danger'
```

```vue-html
<SButton label-mode="info" label="Button" />
```

### `:icon`

Prepend the given icon to the button. You may pass any Iconify icon.

```ts
interface Props {
  icon?: Component
}
```

```vue
<script setup lang="ts">
import IconCheckCircle from '~icons/ph/check-circle-bold'
</script>

<template>
  <SButton :icon="IconCheckCircle" label="Button" />
</template>
```

### `:icon-mode`

Defines the color of the button's icon.

```ts
interface Props {
  iconMode?: Mode
}

type Mode =
  | 'default'
  | 'mute'
  | 'neutral'
  | 'white'
  | 'black'
  | 'info'
  | 'success'
  | 'warning'
  | 'danger'
```

```vue
<script setup lang="ts">
import IconCheckCircle from '~icons/ph/check-circle-bold'
</script>

<template>
  <SButton
    :icon="IconCheckCircle"
    icon-mode="success"
    label="Button"
  />
</template>
```

### `:href`

The `href` attribute to be used for the link. When this prop is set, the button element will use the [`<SLink>`](link) component under the hood. However, if the `:tag` prop is set, it will take precedence over this.

```ts
interface Props {
  label?: string
}
```

```vue-html
<SButton label="Button" href="https://example.com" />
```

### `:rounded`

Give the button rounded corners.

```ts
interface Props {
  rounded?: boolean
}
```

```vue-html
<SButton label="Button" rounded />
```

### `:block`

Set the button's display value to `display: block`. The default button display value is `display: inline-block`.

```ts
interface Props {
  block?: boolean
}
```

```vue-html
<SButton label="Button" block />
```

### `:loading`

Display a loading spinner. While this prop is set to `true`, the `@click` event will not be emitted.

```ts
interface Props {
  loading?: boolean
}
```

```vue-html
<SButton label="Button" loading />
```

### `:disabled`

Mark button as disabled. It will dim the color of the button and prevent `hover` or `click` styles. While this prop is set to `true`, the `@click` event will not be emitted.

```ts
interface Props {
  disabled?: boolean
}
```

```vue-html
<SButton label="Button" disabled />
```

### `:tooltip`

Display a tooltip when the user interacts with the button. Under the hood, this component uses the [`<STooltip>`](tooltip) component.

The tooltip will only be visible when `:tooltip.text` is set.

```ts
interface Props {
  tooltip?: {
    // The HTML tag to be used for the tooltip.
    // Defaults to `span`.
    tag?: string

    // The text to be displayed in the tooltip. The tooltip
    // will only be visible when this prop is set.
    text?: MaybeRef<string | null>

    // The position of the tooltip relative to the button.
    // Defaults to `top`
    position?: 'top' | 'right' | 'bottom' | 'left'

    // The trigger to show the tooltip.
    // Defaults to `both`
    trigger?: 'hover' | 'focus' | 'both'

    // The time after which the tooltip is hidden if triggered
    // because of focussing the trigger element (in milliseconds).
    // Defaults to `undefined` (the tooltip will not hide
    // automatically).
    timeout?: number
  }
}
```

```vue-html
<SButton
  label="Button"
  :tooltip="{
    text: 'Tooltip text'
  }"
/>
```

## Slots

Here are the list of slots you may define within the component.

### `#tooltip-text`

The tooltip content. Same as `:tooltip.text` prop. When the `:tooltip.text` prop and this slot are defined at the same time, this slot will take precedence.

```vue-html
<SButton label="Button">
  <template #tooltip-text>
    Tooltip text
  </template>
</SButton>
```

## Events

Here are the list of events the component may emit.

### `@click`

Emits when the button is clicked. This event will not be emitted when `:loading` or `:disabled` is set to `true`.

```ts
interface Emits {
  (e: 'click'): void
}
```

### `@disabled-click`

Emits when the button is clicked while the `:disabled` is set to `true`. This event will not be emitted when `:loading` or `:disabled` is set to `false`.

This event gives you a chance to, for example, show a message to the user about why the button is disabled.

```ts
interface Emits {
  (e: 'disabled-click'): void
}
```

## Styles

You may customize the styles by overriding `--button` prefixed CSS variables.

### Font size

Customize the font size of the button's label. The font size is different depending on the button's size defined by the `:size` prop. You may override the font size for all button sizes, or customize them individually.

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
  --button-small-font-size: 13px;
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

The component has several different styles based on its type and color combination defined via `:type` and `:mode` props. You may override the styles for each variation of buttons using the following CSS variables.

```css
:root {
  --button-fill-default-border-color: var(--c-border-mute-1);
  --button-fill-default-text-color: var(--c-text-1);
  --button-fill-default-content-color: var(--c-text-1);
  --button-fill-default-bg-color: var(--c-bg-mute-1);
  --button-fill-default-loader-color: var(--c-neutral-1);
  --button-fill-default-hover-border-color: var(--c-border-mute-2);
  --button-fill-default-hover-text-color: var(--c-text-1);
  --button-fill-default-hover-bg-color: var(--c-bg-mute-2);
  --button-fill-default-active-border-color: var(--c-border-mute-3);
  --button-fill-default-active-text-color: var(--c-text-1);
  --button-fill-default-active-bg-color: var(--c-bg-mute-3);
  --button-fill-default-disabled-border-color: var(--c-border-mute-1);
  --button-fill-default-disabled-text-color: var(--c-text-3);
  --button-fill-default-disabled-content-color: var(--c-text-3);
  --button-fill-default-disabled-bg-color: var(--c-bg-mute-1);

  --button-fill-mute-border-color: var(--c-border-mute-1);
  --button-fill-mute-text-color: var(--c-text-2);
  --button-fill-mute-content-color: var(--c-text-2);
  --button-fill-mute-bg-color: var(--c-bg-mute-1);
  --button-fill-mute-loader-color: var(--c-neutral);
  --button-fill-mute-hover-border-color: var(--c-border-mute-2);
  --button-fill-mute-hover-text-color: var(--c-text-2);
  --button-fill-mute-hover-bg-color: var(--c-bg-mute-2);
  --button-fill-mute-active-border-color: var(--c-border-mute-3);
  --button-fill-mute-active-text-color: var(--c-text-2);
  --button-fill-mute-active-bg-color: var(--c-bg-mute-3);
  --button-fill-mute-disabled-border-color: var(--c-border-mute-1);
  --button-fill-mute-disabled-text-color: var(--c-text-3);
  --button-fill-mute-disabled-content-color: var(--c-text-3);
  --button-fill-mute-disabled-bg-color: var(--c-bg-mute-1);

  --button-fill-neutral-border-color: transparent;
  --button-fill-neutral-text-color: var(--c-text-inverse-1);
  --button-fill-neutral-content-color: var(--c-text-1);
  --button-fill-neutral-bg-color: var(--c-neutral-1);
  --button-fill-neutral-loader-color: var(--c-neutral-inverse-1);
  --button-fill-neutral-hover-border-color: transparent;
  --button-fill-neutral-hover-text-color: var(--c-text-inverse-1);
  --button-fill-neutral-hover-bg-color: var(--c-neutral-2);
  --button-fill-neutral-active-border-color: transparent;
  --button-fill-neutral-active-text-color: var(--c-text-inverse-1);
  --button-fill-neutral-active-bg-color: var(--c-neutral-3);
  --button-fill-neutral-disabled-border-color: transparent;
  --button-fill-neutral-disabled-text-color: var(--c-text-inverse-2);
  --button-fill-neutral-disabled-content-color: var(--c-text-2);
  --button-fill-neutral-disabled-bg-color: var(--c-neutral-2);

  --button-fill-white-border-color: transparent;
  --button-fill-white-text-color: var(--c-text-light-1);
  --button-fill-white-content-color: var(--c-text-dark-1);
  --button-fill-white-bg-color: var(--c-neutral-dark-1);
  --button-fill-white-loader-color: var(--c-neutral-light-1);
  --button-fill-white-hover-border-color: transparent;
  --button-fill-white-hover-text-color: var(--c-text-light-1);
  --button-fill-white-hover-bg-color: var(--c-neutral-dark-2);
  --button-fill-white-active-border-color: transparent;
  --button-fill-white-active-text-color: var(--c-text-light-1);
  --button-fill-white-active-bg-color: var(--c-neutral-dark-3);
  --button-fill-white-disabled-border-color: transparent;
  --button-fill-white-disabled-text-color: var(--c-text-light-2);
  --button-fill-white-disabled-content-color: var(--c-text-dark-2);
  --button-fill-white-disabled-bg-color: var(--c-neutral-dark-2);

  --button-fill-black-border-color: transparent;
  --button-fill-black-text-color: var(--c-text-dark-1);
  --button-fill-black-content-color: var(--c-text-light-1);
  --button-fill-black-bg-color: var(--c-neutral-light-1);
  --button-fill-black-loader-color: var(--c-neutral-dark-1);
  --button-fill-black-hover-border-color: transparent;
  --button-fill-black-hover-text-color: var(--c-text-dark-1);
  --button-fill-black-hover-bg-color: var(--c-neutral-light-2);
  --button-fill-black-active-border-color: transparent;
  --button-fill-black-active-text-color:var(--c-text-dark-1);
  --button-fill-black-active-bg-color: var(--c-neutral-light-3);
  --button-fill-black-disabled-border-color: transparent;
  --button-fill-black-disabled-text-color: var(--c-text-dark-2);
  --button-fill-black-disabled-content-color: var(--c-text-light-2);
  --button-fill-black-disabled-bg-color: var(--c-neutral-light-2);

  --button-fill-info-border-color: var(--c-border-info-1);
  --button-fill-info-text-color: var(--c-white-1);
  --button-fill-info-content-color: var(--c-white-1);
  --button-fill-info-bg-color: var(--c-bg-info-1);
  --button-fill-info-loader-color: var(--c-white-1);
  --button-fill-info-hover-border-color: var(--c-border-info-2);
  --button-fill-info-hover-text-color: var(--c-white-1);
  --button-fill-info-hover-bg-color: var(--c-bg-info-2);
  --button-fill-info-active-border-color: var(--c-border-info-3);
  --button-fill-info-active-text-color: var(--c-white-1);
  --button-fill-info-active-bg-color: var(--c-bg-info-3);
  --button-fill-info-disabled-border-color: var(--c-blue-9);
  --button-fill-info-disabled-text-color: var(--c-white-a2);
  --button-fill-info-disabled-content-color: var(--c-white-a2);
  --button-fill-info-disabled-bg-color: var(--c-blue-8);

  --button-fill-success-border-color: var(--c-border-success-1);
  --button-fill-success-text-color: var(--c-white-1);
  --button-fill-success-content-color: var(--c-white-1);
  --button-fill-success-bg-color: var(--c-bg-success-1);
  --button-fill-success-loader-color: var(--c-white);
  --button-fill-success-hover-border-color: var(--c-border-success-2);
  --button-fill-success-hover-text-color: var(--c-white);
  --button-fill-success-hover-bg-color: var(--c-bg-success-2);
  --button-fill-success-active-border-color: var(--c-border-success-3);
  --button-fill-success-active-text-color: var(--c-white);
  --button-fill-success-active-bg-color: var(--c-bg-success-3);
  --button-fill-success-disabled-border-color: var(--c-green-9);
  --button-fill-success-disabled-text-color: var(--c-white-a2);
  --button-fill-success-disabled-content-color: var(--c-white-a2);
  --button-fill-success-disabled-bg-color: var(--c-green-8);

  --button-fill-warning-border-color: var(--c-border-mute-1);
  --button-fill-warning-text-color: var(--c-text-warning-1);
  --button-fill-warning-content-color: var(--c-text-warning-1);
  --button-fill-warning-bg-color: var(--c-bg-mute-1);
  --button-fill-warning-loader-color: var(--c-neutral);
  --button-fill-warning-hover-border-color: var(--c-border-warning-1);
  --button-fill-warning-hover-text-color: var(--c-white);
  --button-fill-warning-hover-bg-color: var(--c-bg-warning-1);
  --button-fill-warning-active-border-color: var(--c-border-warning-2);
  --button-fill-warning-active-text-color: var(--c-white);
  --button-fill-warning-active-bg-color: var(--c-bg-warning-2);
  --button-fill-warning-disabled-border-color: var(--c-border-mute-1);
  --button-fill-warning-disabled-text-color: var(--c-text-warning-2);
  --button-fill-warning-disabled-content-color: var(--c-text-warning-2);
  --button-fill-warning-disabled-bg-color: var(--c-bg-mute-1);

  --button-fill-danger-border-color: var(--c-border-mute-1);
  --button-fill-danger-text-color: var(--c-text-danger-1);
  --button-fill-danger-content-color: var(--c-text-danger-1);
  --button-fill-danger-bg-color: var(--c-bg-mute-1);
  --button-fill-danger-loader-color: var(--c-neutral);
  --button-fill-danger-hover-border-color: var(--c-border-danger-1);
  --button-fill-danger-hover-text-color: var(--c-white);
  --button-fill-danger-hover-bg-color: var(--c-bg-danger-1);
  --button-fill-danger-active-border-color: var(--c-border-danger-2);
  --button-fill-danger-active-text-color: var(--c-white);
  --button-fill-danger-active-bg-color: var(--c-bg-danger-2);
  --button-fill-danger-disabled-border-color: var(--c-border-mute-1);
  --button-fill-danger-disabled-text-color: var(--c-text-danger-2);
  --button-fill-danger-disabled-content-color: var(--c-text-danger-2);
  --button-fill-danger-disabled-bg-color: var(--c-bg-mute-1);

  --button-outline-default-border-color: var(--c-border-mute-1);
  --button-outline-default-text-color: var(--c-text-1);
  --button-outline-default-content-color: var(--c-text-1);
  --button-outline-default-loader-color: var(--c-neutral-1);
  --button-outline-default-hover-bg-color: var(--c-neutral-dimm-a1);
  --button-outline-default-active-bg-color: var(--c-neutral-dimm-a2);
  --button-outline-default-disabled-border-color: var(--c-border-mute-1);
  --button-outline-default-disabled-text-color: var(--c-text-3);
  --button-outline-default-disabled-content-color: var(--c-text-3);

  --button-outline-mute-border-color: var(--c-border-mute-1);
  --button-outline-mute-text-color: var(--c-text-2);
  --button-outline-mute-content-color: var(--c-text-2);
  --button-outline-mute-loader-color: var(--c-neutral-1);
  --button-outline-mute-hover-bg-color: var(--c-neutral-dimm-a1);
  --button-outline-mute-active-bg-color: var(--c-neutral-dimm-a2);
  --button-outline-mute-disabled-border-color: var(--c-border-mute-1);
  --button-outline-mute-disabled-text-color: var(--c-text-3);
  --button-outline-mute-disabled-content-color: var(--c-text-3);

  --button-outline-neutral-border-color: var(--c-neutral-1);
  --button-outline-neutral-text-color: var(--c-text-1);
  --button-outline-neutral-content-color: var(--c-text-1);
  --button-outline-neutral-loader-color: var(--c-neutral-1);
  --button-outline-neutral-hover-bg-color: var(--c-neutral-dimm-a1);
  --button-outline-neutral-active-bg-color: var(--c-neutral-dimm-a2);
  --button-outline-neutral-disabled-border-color: var(--c-neutral-3);
  --button-outline-neutral-disabled-text-color: var(--c-text-3);
  --button-outline-neutral-disabled-content-color: var(--c-text-3);

  --button-outline-white-border-color: var(--c-neutral-dark-1);
  --button-outline-white-text-color: var(--c-text-dark-1);
  --button-outline-white-content-color: var(--c-text-dark-1);
  --button-outline-white-loader-color: var(--c-neutral-dark-1);
  --button-outline-white-hover-bg-color: var(--c-neutral-dark-dimm-a1);
  --button-outline-white-active-bg-color: var(--c-neutral-dark-dimm-a2);
  --button-outline-white-disabled-border-color: var(--c-neutral-dark-3);
  --button-outline-white-disabled-text-color: var(--c-text-dark-3);
  --button-outline-white-disabled-content-color: var(--c-text-dark-3);

  --button-outline-black-border-color: var(--c-neutral-light-1);
  --button-outline-black-text-color: var(--c-text-light-1);
  --button-outline-black-content-color: var(--c-text-light-1);
  --button-outline-black-loader-color: var(--c-neutral-light-1);
  --button-outline-black-hover-bg-color: var(--c-neutral-light-dimm-a1);
  --button-outline-black-active-bg-color: var(--c-neutral-light-dimm-a2);
  --button-outline-black-disabled-border-color: var(--c-neutral-light-3);
  --button-outline-black-disabled-text-color: var(--c-text-light-3);
  --button-outline-black-disabled-content-color: var(--c-text-light-3);

  --button-outline-info-border-color: var(--c-border-info-1);
  --button-outline-info-text-color: var(--c-text-info-1);
  --button-outline-info-content-color: var(--c-text-info-1);
  --button-outline-info-loader-color: var(--c-neutral-1);
  --button-outline-info-hover-bg-color: var(--c-bg-info-dimm-a1);
  --button-outline-info-active-bg-color: var(--c-bg-info-dimm-a2);
  --button-outline-info-disabled-border-color: var(--c-blue-8);
  --button-outline-info-disabled-text-color: var(--c-text-info-3);
  --button-outline-info-disabled-content-color: var(--c-text-info-3);

  --button-outline-success-border-color: var(--c-border-success-1);
  --button-outline-success-text-color: var(--c-text-success-1);
  --button-outline-success-content-color: var(--c-text-success-1);
  --button-outline-success-loader-color: var(--c-neutral-1);
  --button-outline-success-hover-bg-color: var(--c-bg-success-dimm-a1);
  --button-outline-success-active-bg-color: var(--c-bg-success-dimm-a2);
  --button-outline-success-disabled-border-color: var(--c-green-8);
  --button-outline-success-disabled-text-color: var(--c-text-success-3);
  --button-outline-success-disabled-content-color: var(--c-text-success-3);

  --button-outline-warning-border-color: var(--c-border-warning-1);
  --button-outline-warning-text-color: var(--c-text-warning-1);
  --button-outline-warning-content-color: var(--c-text-warning-1);
  --button-outline-warning-loader-color: var(--c-neutral-1);
  --button-outline-warning-hover-bg-color: var(--c-bg-warning-dimm-a1);
  --button-outline-warning-active-bg-color: var(--c-bg-warning-dimm-a2);
  --button-outline-warning-disabled-border-color: var(--c-yellow-8);
  --button-outline-warning-disabled-text-color: var(--c-text-warning-3);
  --button-outline-warning-disabled-content-color: var(--c-text-warning-3);

  --button-outline-danger-border-color: var(--c-border-danger-1);
  --button-outline-danger-text-color: var(--c-text-danger-1);
  --button-outline-danger-content-color: var(--c-text-danger-1);
  --button-outline-danger-loader-color: var(--c-neutral-1);
  --button-outline-danger-hover-bg-color: var(--c-bg-danger-dimm-a1);
  --button-outline-danger-active-bg-color: var(--c-bg-danger-dimm-a2);
  --button-outline-danger-disabled-border-color: var(--c-red-8);
  --button-outline-danger-disabled-text-color: var(--c-text-danger-3);
  --button-outline-danger-disabled-content-color: var(--c-text-danger-3);

  --button-text-default-text-color: var(--c-text-1);
  --button-text-default-content-color: var(--c-text-1);
  --button-text-default-hover-bg-color: var(--c-bg-mute-1);
  --button-text-default-active-bg-color: var(--c-bg-mute-2);
  --button-text-default-disabled-text-color: var(--c-text-3);
  --button-text-default-disabled-content-color: var(--c-text-3);

  --button-text-mute-text-color: var(--c-text-2);
  --button-text-mute-content-color: var(--c-text-2);
  --button-text-mute-hover-bg-color: var(--c-bg-mute-1);
  --button-text-mute-active-bg-color: var(--c-bg-mute-2);
  --button-text-mute-disabled-text-color: var(--c-text-3);
  --button-text-mute-disabled-content-color: var(--c-text-3);

  --button-text-neutral-text-color: var(--c-text-1);
  --button-text-neutral-content-color: var(--c-text-1);
  --button-text-neutral-hover-bg-color: var(--c-neutral-dimm-a1);
  --button-text-neutral-active-bg-color: var(--c-neutral-dimm-a2);
  --button-text-neutral-disabled-text-color: var(--c-text-3);
  --button-text-neutral-disabled-content-color: var(--c-text-3);

  --button-text-white-text-color: var(--c-text-dark-1);
  --button-text-white-content-color: var(--c-text-dark-1);
  --button-text-white-hover-bg-color: var(--c-neutral-dark-dimm-a1);
  --button-text-white-active-bg-color: var(--c-neutral-dark-dimm-a2);
  --button-text-white-disabled-text-color: var(--c-text-dark-3);
  --button-text-white-disabled-content-color: var(--c-text-dark-3);

  --button-text-black-text-color: var(--c-text-light-1);
  --button-text-black-content-color: var(--c-text-light-1);
  --button-text-black-hover-bg-color: var(--c-neutral-light-dimm-a1);
  --button-text-black-active-bg-color: var(--c-neutral-light-dimm-a2);
  --button-text-black-disabled-text-color: var(--c-text-light-3);
  --button-text-black-disabled-content-color: var(--c-text-light-3);

  --button-text-info-text-color: var(--c-text-info-1);
  --button-text-info-content-color: var(--c-text-info-1);
  --button-text-info-hover-bg-color: var(--c-bg-info-dimm-a1);
  --button-text-info-active-bg-color: var(--c-bg-info-dimm-a2);
  --button-text-info-disabled-text-color: var(--c-text-info-3);
  --button-text-info-disabled-content-color: var(--c-text-info-3);

  --button-text-success-text-color: var(--c-text-success-1);
  --button-text-success-content-color: var(--c-text-success-1);
  --button-text-success-hover-bg-color: var(--c-bg-success-dimm-a1);
  --button-text-success-active-bg-color: var(--c-bg-success-dimm-a2);
  --button-text-success-disabled-text-color: var(--c-text-success-3);
  --button-text-success-disabled-content-color: var(--c-text-success-3);

  --button-text-warning-text-color: var(--c-text-warning-1);
  --button-text-warning-content-color: var(--c-text-warning-1);
  --button-text-warning-hover-bg-color: var(--c-bg-warning-dimm-a1);
  --button-text-warning-active-bg-color: var(--c-bg-warning-dimm-a2);
  --button-text-warning-disabled-text-color: var(--c-text-warning-3);
  --button-text-warning-disabled-content-color: var(--c-text-warning-3);

  --button-text-danger-text-color: var(--c-text-danger-1);
  --button-text-danger-content-color: var(--c-text-danger-1);
  --button-text-danger-hover-bg-color: var(--c-bg-danger-dimm-a1);
  --button-text-danger-active-bg-color: var(--c-bg-danger-dimm-a2);
  --button-text-danger-disabled-text-color: var(--c-text-danger-3);
  --button-text-danger-disabled-content-color: var(--c-text-danger-3);
}
```
