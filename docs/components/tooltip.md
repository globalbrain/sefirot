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

### `:tag`

Defines the HTML tag for the pill. Any value passed to this prop will used as `<component :is="tag">`. The default tag for the button is `span`.

```ts
interface Props {
  tag?: Component | string
}
```

```vue-html
<STooltip tag="div" text="...">
  ...
</STooltip>
```

### `:triggerTag`

Defines the HTML tag for the trigger element. Any value passed to this prop will used as `<component :is="triggerTag">`. The default tag for the trigger element is `span`.

```ts
interface Props {
  triggertag?: Component | string
}
```

```vue-html
<STooltip triggerTag="div" text="...">
  ...
</STooltip>
```

Note that setting this to something other than `span` is required when you want to put block elements within the trigger element.

### `:text`

Defines the content of tooltip.

```ts
interface Props {
  text?: string
}
```

```vue-html
<STooltip text="Tooltip text.">
  ...
</STooltip>
```

### `:position`

Defines the position of the tooltip. Defaults to `'top'`.

```ts
interface Props {
  position?: 'top' | 'right' | 'bottom' | 'left'
}
```

```vue-html
<STooltip text="..." position="bottom">
  ...
</STooltip>
```

### `:display`

Defines the css `display` property of the tooltip. Defaults to undefined.

```ts
interface Props {
  display?: 'inline' | 'inline-block' | 'block'
}
```

```vue-html
<STooltip text="..." display="inline-block">
  ...
</STooltip>
```

### `:trigger`

Defines the trigger event to show the tooltip. Defaults to `'hover'`.

```ts
interface Props {
  trigger?: 'hover' | 'focus' | 'both'
}
```

```vue-html
<STooltip text="..." trigger="focus">
  ...
</STooltip>
```

### `:timeout`

Defines the timeout in milliseconds to hide the tooltip. Used only when `trigger` is set to `'focus'` or `'both'`. Defaults to `undefined` (the tooltip will not hide automatically).

```ts
interface Props {
  timeout?: number
}
```

```vue-html
<STooltip text="..." trigger="focus" timeout="1000">
  ...
</STooltip>
```

### `:tabindex`

Defines the `tabindex` attribute of the tooltip. Defaults to `0`. Useful when nesting focusable elements like buttons within the tooltip.

```ts
interface Props {
  tabindex?: number
}
```

```vue-html
<STooltip text="..." tabindex="-1">
  ...
</STooltip>
```

## Slots

Here are the list of slots you may define within the component.

### `#default`

The content that a user would hover over to display tooltip.

```vue-html
<STooltip text="Tooltip text.">
  Hover this text
</STooltip>
```

### `#text` {#text-slot}

The content of tooltip. Same as `text` prop. When `text` prop and this slot are defined at the same time, this slot will take precedence.

```vue-html
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
  --tooltip-bg-color: var(--c-bg-elv-4);
}
```
