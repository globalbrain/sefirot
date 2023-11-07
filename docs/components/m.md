# SM <Badge text="3.2.0" />

`<SM>`, where "M" stands for "Motion", allows element to animate when it enters or leaves the viewport. See in action on [Histoire](https://story.sefirot.globalbrains.com/story/stories-components-sm-01-playground-story-vue).

## Overview

Use this component to add subtle animations to the element when it enters or leaves the viewport. It is meant to be used on marketing heavy sites, such as corporate website. Good example being [XLIMIT Website](https://xlimit.globalbrains.com/).

Most of the time, avoid using this component on web apps. It makes the app feel more sluggish than it should be, especially once users are familiar with the app.

## Import

```ts
import SM from '@globalbrain/sefirot/lib/components/SM.vue'
import SMFade from '@globalbrain/sefirot/lib/components/SMFade.vue'
```

## Usage

`<SM>` takes a single slot, and it will apply the animation to the wrapper element, which is `<SM>` it self. Define properties that needs to animate. These values are initial value where the animation starts from. All properties will be animated to the element's default value, e.g. `1` for `opacity`.

```vue-html
<!-- This component will transtition opacity from 0 to 1. -->
<SM opacity="0">
  Lorem ipsum...
</SM>
```

See [Props section](#props) for all available properties.

### Using preset components

You may also use preset components that comes with predefined properties. All preset components are prefixed with `SM`.

For example, `<SMFade>` is a preset component that animates `opacity` from `0` to `1`.

```vue-html
<SMFade>
  Lorem ipsum...
</SMFade>
```

See [Preset components section](#preset-components) for all available preset components.

## Preset components

All presets components extends all `<SM>` props. The only difference is that preset components have default value set for some of the props.

### `<SMFade>`

The preset component that animates `opacity` from `0` to `1`.

```vue-html
<SMFade>
  Lorem ipsum...
</SMFade>
```

## Props

These are the props for `<SM>`. All preset components such as `<SMFade>` extends these props but with different default values. See [Preset components section](#preset-components) for how each preset components defines their defaults.

```ts
interface Props {
  as?: string
  x?: string
  y?: string
  opacity?: string | number
  duration?: string
  delay?: string
  once?: boolean
}
```

### `:as`

Defines element tag for the button.

```ts
interface Props {
  // @default 'div'
  as?: string
}
```

```vue-html
<SM as="p">
  ...
</SM>
```

### `:x`

Sets the initial value of `transform: translateX()`.

```ts
interface Props {
  // @default '0'
  x?: string
}
```

```vue-html
<SM x="8px">
  ...
</SM>
```

### `:y`

Sets the initial value of `transform: translateY()`.

```ts
interface Props {
  // @default '0'
  y?: string
}
```

```vue-html
<SM y="8px">
  ...
</SM>
```

### `:opacity`

Sets the initial value of `opacity`.

```ts
interface Props {
  // @default 1
  opacity?: string | number
}
```

```vue-html
<SM opacity="0">
  ...
</SM>
```

### `:duration`

The duration of the whole animation. Sets `transition-duration` CSS property.

```ts
interface Props {
  // @default '0.75s'
  duration?: string
}
```

```vue-html
<SM opacity="0" duration="1s">
  ...
</SM>
```

### `:delay`

Delays the animation until given time when the element enters the viewport. Sets `transition-delay` CSS property.

```ts
interface Props {
  // @default '0s'
  delay?: string
}
```

```vue-html
<SM opacity="0" delay="0.5s">
  ...
</SM>
```

### `:once`

Whether animation should run everytime the element enters the viewport. If set to `true`, the animation will only run once. When set to `false` animation will play when the element also leaves the viewport.

It is defaults to `true` and it is recommended to keep it that way. Having to animate elements while user scroll back the already scrolled area may result in frastrating result.

```ts
interface Props {
  // @default true
  once?: boolean
}
```

```vue-html
<SM opacity="0" :once="false">
  ...
</SM>
```

## Slots

### `#default`

`<SM>` will render any passed slot as is. Note that the transition animation is applied to root element, not to children.

```ts
interface SlotProps {
  on: boolean
}
```

```vue-html
<SM opacity="0">
  <p>Lorem ipsum...</p>
</SM>
```

The slot prop `:on` is `true` when the element is in the viewport. You may use this to apply different styles to the child component to create more complex animations.

```vue-html
<SM opacity="0" v-slot="{ on }">
  <div :class="{ 'advanced-animation': on }">
    ...
  </div>
</SM>
```
