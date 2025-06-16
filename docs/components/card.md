---
outline: deep
---

<script setup lang="ts">
import SCard from 'sefirot/components/SCard.vue'
import SCardBlock from 'sefirot/components/SCardBlock.vue'
import SControl from 'sefirot/components/SControl.vue'
import SControlActionBar from 'sefirot/components/SControlActionBar.vue'
import SControlActionBarCollapse from 'sefirot/components/SControlActionBarCollapse.vue'
import SControlButton from 'sefirot/components/SControlButton.vue'
import SControlLeft from 'sefirot/components/SControlLeft.vue'
import SControlRight from 'sefirot/components/SControlRight.vue'
import SControlText from 'sefirot/components/SControlText.vue'
</script>

# SCard

`<SCard>` is a basic card component that can display variety of contents.

<Showcase
  path="/components/SCard.vue"
  story="/stories-components-scard-01-playground-story-vue"
>
  <div class="flex flex-wrap gap-12">
    <SCard>
      <SCardBlock size="small" class="pl-24 pr-16">
        <SControl>
          <SControlLeft>
            <SControlText class="font-w-600">
              Header title
            </SControlText>
          </SControlLeft>
          <SControlRight>
            <SControlActionBar>
              <SControlActionBarCollapse />
            </SControlActionBar>
          </SControlRight>
        </SControl>
      </SCardBlock>
      <SCardBlock class="px-24 py-8">
        <p class="text-14">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat.
        </p>
      </SCardBlock>
      <SCardBlock size="small" class="px-24">
        <SControl>
          <SControlRight>
            <SControlButton label="Cancel" />
            <SControlButton mode="info" label="Submit" />
          </SControlRight>
        </SControl>
      </SCardBlock>
    </SCard>
  </div>
</Showcase>

## Usage

`<SCard>` comes with various `SCard` and `SControl` components that you can use to build your card. For example, basic card with header, body, and footer can be built like this:

```vue
<script setup lang="ts">
import SCard from '@globalbrain/sefirot/lib/components/SCard.vue'
import SCardBlock from '@globalbrain/sefirot/lib/components/SCardBlock.vue'
import SControl from '@globalbrain/sefirot/lib/components/SControl.vue'
import SControlActionBar from '@globalbrain/sefirot/lib/components/SControlActionBar.vue'
import SControlActionBarClose from '@globalbrain/sefirot/lib/components/SControlActionBarClose.vue'
import SControlButton from '@globalbrain/sefirot/lib/components/SControlButton.vue'
import SControlLeft from '@globalbrain/sefirot/lib/components/SControlLeft.vue'
import SControlRight from '@globalbrain/sefirot/lib/components/SControlRight.vue'
import SControlText from '@globalbrain/sefirot/lib/components/SControlText.vue'
</script>

<template>
  <SCard>
    <SCardBlock size="small" class="s-pl-24 s-pr-16">
      <SControl>
        <SControlLeft>
          <SControlText class="s-font-w-600">
            Header title
          </SControlText>
        </SControlLeft>
        <SControlRight>
          <SControlActionBar>
            <SControlActionBarClose />
          </SControlActionBar>
        </SControlRight>
      </SControl>
    </SCardBlock>
    <SCardBlock class="s-px-24 s-py-8">
      <p class="s-text-14">Lorem ipsum...</p>
    </SCardBlock>
    <SCardBlock size="small" class="s-px-24">
      <SControl>
        <SControlRight>
          <SControlButton label="Cancel" />
          <SControlButton mode="info" label="Submit" />
        </SControlRight>
      </SControl>
    </SCardBlock>
  </SCard>
</template>
```

Learn more about each child component's usage in the following sections.

## Root

The `<SCard>` is the root component of the card. All child components must be placed under this component.

```vue-html
<SCard>
  <SCardBlock>...</SCardBlock>
  <SCardBlock>...</SCardBlock>
  <SCardBlock>...</SCardBlock>
</SCard>
```

### Props

#### `:mode`

You may define `:mode` to change the appearance of the card. Usually, this is most used when creating "dangerous" cards, such as a card that displays a warning message before deleting something.

```ts
interface Props {
  /**
   * @default 'neutral'
   */
  mode?: 'neutral' | 'info' | 'success' | 'warning' | 'danger'
}
```

```vue-html
<SCard mode="danger">
  ...
</SCard>
```

#### `:size`

You may define `:size` to change the size of the card. This prop is **required** if you are rendering the card inside a `<SModal>` component. It has no effect when the card is rendered as a standalone component.

```ts
interface Props {
  size?: 'small' | 'medium' | 'large' | 'xlarge' | 'xxlarge'
}
```

```vue-html
<SCard size="small">
  ...
</SCard>
```

## Block

Use `<SCardBlock>` to display generic block element. This component can be used to create the header, body, or footer of the card.

```vue-html
<SCard>
  <SCardBlock>
    <p>Lorem ipsum...</p>
  </SCardBlock>
</SCard>
```

### Props

#### `:size`

You need to define `:size` to specify the size of the block. This prop is **required**. You might need to add some padding to the block to make it look good.

```ts
interface Props {
  size: 'small' | 'medium' | 'large' | 'xlarge' | 'xxlarge'
}
```

```vue-html
<SCard>
  <SCardBlock size="small" class="s-px-24 s-py-8">
    <p>Lorem ipsum...</p>
  </SCardBlock>
</SCard>
```

#### `:bg`

You may define `:bg` to change the background color of the block. This prop is useful when you want to emphasize the block.

```ts
interface Props {
  /**
   * @default 'elv-3'
   */
  bg?: 'elv-1' | 'elv-2' | 'elv-3' | 'elv-4' | 'none'
}
```

```vue-html
<SCard>
  <SCardBlock bg="elv-1">
    <p>Lorem ipsum...</p>
  </SCardBlock>
</SCard>
```

<!-- Learn more about each child component's usage in the following sections.
## Header

Use `<SCardHeader>` with `<SCardHeaderTitle>` and `<SCardActions>` to construct the header. 

### Header title

The `<SCardHeaderTitle>` allows you to display the title text in the header.

```vue-html
<SCard>
  <SCardHeader>
    <SCardHeaderTitle>
      Header title
    </SCardHeaderTitle>
  </SCardHeader>
</SCard>
```

You may also pass `:mode` to change the appearance of the title text. Combine this prop with `:mode` prop of `<SCard>` to emphasize the card's purpose.

```ts
interface Props {
  mode?: 'neutral' | 'info' | 'success' | 'warning' | 'danger'
}
```

```vue-html
<SCard mode="danger">
  <SCardHeader>
    <SCardHeaderTitle mode="danger">
      Header title
    </SCardHeaderTitle>
  </SCardHeader>
</SCard>
```

### Header actions

You may use `<SCardHeaderActions>` with nested `<SCardHeaderAction>` to add header actions. `<SCardHeaderAction>` accepts following props, and emits `@click` event when user clicks on the button.

It uses [`<SButton>`](./button) component internally. Refer to the documentation of `<SButton>` for how the props work.

```ts
import { type IconifyIcon } from '@iconify/vue/dist/offline'

interface Props {
  icon: IconifyIcon
  disabled?: boolean
  tooltip?: string | Tooltip
}

export interface Tooltip {
  tag?: Component | string
  text?: MaybeRef<string>
  position?: Position
  trigger?: 'hover' | 'focus' | 'both'
  timeout?: number
}
```

```vue-html
<SCard>
  <SCardHeaderActions>
    <SCardHeaderAction :icon="IconAdd" @click="onClick" />
    <SCardHeaderAction :icon="IconEdit" @click="onClick" />
  </SCardHeader>
</SCard>
```

There are also a few predefined header actions that you can use.

- `<SCardHeaderActionClose>`
- `<SCardHeaderActionCollapse>`

You may also use `<SCardHeaderActionClose>` to display close button. It emits `@click` event when user clicks on the button. This component is shorcut for setting "X" icon to `<SCardHeaderAction>`.

```vue-html
<SCard>
  <SCardHeaderActions>
    <SCardHeaderActionClose @click="onClick" />
  </SCardHeader>
</SCard>
```

`<SCardHeaderActionCollapse>` will display a collapsable icon that a user may click to collapse the card. When clicked on the button, it will collapse the `<SCard>` component. Therefore, you must use this component inside `<SCard>` component to take any effect.

```vue-html
<SCard>
  <SCardHeaderActions>
    <SCardHeaderActionCollapse />
  </SCardHeader>
</SCard>
```

You may pass `:collapsed` prop to control the initial state of the card collaption.

```vue-html
<SCard>
  <SCardHeaderActions>
    <SCardHeaderActionCollapse collapsed />
  </SCardHeader>
</SCard>
```

## Block

Use `<SCardBlock>` to display generic block element. This component is usually used to create a "body" section of the card. However, you may use this component to create any block within the card.

```vue-html
<SCard>
  <SCardBlock>
    <p>Lorem ipsum...</p>
  </SCardBlock>
</SCard>
```

### Block spacing

The `<SCardBlock>` component provides a convenient way to control the padding of the block using the `:space` prop. You can choose between 3 values: `compact`, `wide`, or `xwide`.

```ts
interface Props {
  space?: 'compact' | 'wide' | 'xwide'
}
```

```vue-html
<SCard>
  <SCardBlock space="compact">
    <p>Lorem ipsum...</p>
  </SCardBlock>
</SCard>
```

To ensure consistent spacing across the application, you should adjust the spacing based on the size of the `<SCard>` component. Consider using the `compact` class for card width smaller than `640px` and the `wide` class for larger widths. Use `xwide` for the card containing form and placed sorely on the page (not as modal dialog).

## Footer

Similar to `<SCardHeader>`, use `<SCardFooter>` to add the "footer" section of the card. `<SCardFooter>` comes with nested `<SCardFooterActions>` and `<SCardFooterAction>` to display action buttons.

```vue-html
<SCard>
  <SCardFooter>
    <SCardFooterActions>
      <SCardFooterAction mode="mute" label="Cancel" @click="onClick" />
      <SCardFooterAction mode="info" label="Submit" @click="onClick" />
    </SCardFooterActions>
  </SCardFooter>
</SCard>
```

### Footer actions

`<SCardFooterAction>` accepts following props. As same as `<SCardHeaderAction>`, it uses [`<SButton>`](./button) component internally. Refer to the documentation of `<SButton>` for how the props work.

```ts
interface Props {
  mode?: Mode
  label?: string
  labelMode?: Mode
  loading?: boolean
  disabled?: boolean
  tooltip?: string | Tooltip
}

export interface Tooltip {
  tag?: Component | string
  text?: MaybeRef<string>
  position?: Position
  trigger?: 'hover' | 'focus' | 'both'
  timeout?: number
}
```

### Footer spacing

Same as, `<SCardBlock>`, `<SCardFooter>` also comes with `:space` props that lets you control the padding of the block. You may pass either `compact`, `wide` or `xwide` as a value.

```ts
interface Props {
  space?: 'compact' | 'wide' | `xwide`
}
```

```vue-html
<SCard>
  <SCardFooter space="compact">
    ...
  </SCardFooter>
</SCard>
```

It's important to align this spacing with the `<SCardBlock>` component to ensure proper alignment between the block contents and the footer contents, such as actions. -->
