<script setup lang="ts">
import STooltip from 'sefirot/components/STooltip.vue'
</script>

# STooltip

`<STooltip>` is a component to display small popup text on any given component.

<Showcase
  path="/components/STooltip.vue"
  story="/stories-components-stooltip-01-playground-story-vue"
>
  <STooltip text="This is a tooltip message.">
    Hover this text.
  </STooltip>
</Showcase>

## Usage

Import `<STooltip>` component and pass in tooltip `text` as a prop.

```vue
<script setup lang="ts">
import STooltip from '@globalbrain/sefirot/lib/components/STooltip.vue'
</script>

<template>
  <STooltip text="Tooltip text.">
    Hover this text
  </STooltip>
</template>
```

You may also pass in the `text` as slot. This is useful when you want to add HTML element such as link to within tooltip.

```vue
<script setup lang="ts">
import STooltip from '@globalbrain/sefirot/lib/components/STooltip.vue'
</script>

<template>
  <STooltip>
    <template #default>
      Hover this text
    </template>
    <template #text>
      Tooltip text with <a href="...">link</a>.
    </template>
  </STooltip>
</template>
```

## Props

Here are the list of props you may pass to the component.

### `tag`

Defines the HTML tag for the pill. Any value passed to this prop will used as `<component :is="tag">`. The default tag for the button is `span`.

```ts
interface Props {
  tag?: string
}
```

```html
<STooltip tag="div" text="...">
  ...
</STooltip>
```

### `text`

Defines the content of tooltip.

```ts
interface Props {
  text?: string
}
```

```html
<STooltip text="Tooltip text.">
  ...
</STooltip>
```

### `position`

Defines the position of the tooltip. Defaults to `'top'`.

```ts
interface Props {
  position?: 'top' | 'right' | 'bottom' | 'left'
}
```

```html
<STooltip text="..." position="bottom">
  ...
</STooltip>
```

## Slots

Here are the list of slots you may define within the component.

### `default`

The content that a user would hover over to display tooltip.

```html
<STooltip text="Tooltip text.">
  Hover this text
</STooltip>
```

### `text`

The content of tooltip. Same as `text` prop. When `text` prop and this slot is defined at same time, this slot will take precedence.

```html
<STooltip>
  <template #default>
    Hover this text
  </template>
  <template #text>
    Tooltip text with <a href="...">link</a>.
  </template>
</STooltip>
```

## Styles

You may customize the styles by overriding `--tooltip` prefixed CSS variables.

### Available styles

Override following styles to customize the component.

```css
:root {
  /**
   * Set `max-width` of the tooltip. The tooltip content text
   * gets wrapped when the tooltip hits this size.
   */
  --tooltip-max-width: 288px;

  /* Colors of tooltip. */
  --tooltip-border-color: var(--c-divider-2);
  --tooltip-text-color: var(--c-text-1);
  --tooltip-bg-color: var(--c-bg-elv-3);
}
```
