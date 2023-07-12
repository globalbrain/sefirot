<script setup lang="ts">
import SCard from 'sefirot/components/SCard.vue'
import SCardBlock from 'sefirot/components/SCardBlock.vue'
import SCardFooter from 'sefirot/components/SCardFooter.vue'
import SCardFooterAction from 'sefirot/components/SCardFooterAction.vue'
import SCardFooterActions from 'sefirot/components/SCardFooterActions.vue'
import SCardHeader from 'sefirot/components/SCardHeader.vue'
import SCardHeaderActionClose from 'sefirot/components/SCardHeaderActionClose.vue'
import SCardHeaderActions from 'sefirot/components/SCardHeaderActions.vue'
import SCardHeaderTitle from 'sefirot/components/SCardHeaderTitle.vue'
</script>

# SCard

`<SCard>` is a basic card component that can display variety of contents.

<Showcase
  path="/components/SCard.vue"
  story="/stories-components-scard-01-playground-story-vue"
>
  <div class="flex flex-wrap gap-12">
    <SCard>
      <SCardHeader>
        <SCardHeaderTitle>Header title</SCardHeaderTitle>
        <SCardHeaderActions>
          <SCardHeaderActionClose />
        </SCardHeaderActions>
      </SCardHeader>
      <SCardBlock space="compact">
        <p class="m-0 text-14">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat.
        </p>
      </SCardBlock>
      <SCardFooter>
        <SCardFooterActions>
          <SCardFooterAction mode="mute" label="Cancel" />
          <SCardFooterAction mode="info" label="Submit" />
        </SCardFooterActions>
      </SCardFooter>
    </SCard>
  </div>
</Showcase>

## Usage

`<SCard>` components comes with various child components that you can use to build your card. For example, basic card with header, body, and footer can be built like this:

```vue
<script setup lang="ts">
import SCard from '@globalbrain/sefirot/lib/components/SCard.vue'
import SCardBlock from '@globalbrain/sefirot/lib/components/SCardBlock.vue'
import SCardFooter from '@globalbrain/sefirot/lib/components/SCardFooter.vue'
import SCardFooterAction from '@globalbrain/sefirot/lib/components/SCardFooterAction.vue'
import SCardFooterActions from '@globalbrain/sefirot/lib/components/SCardFooterActions.vue'
import SCardHeader from '@globalbrain/sefirot/lib/components/SCardHeader.vue'
import SCardHeaderActionClose from '@globalbrain/sefirot/lib/components/SCardHeaderActionClose.vue'
import SCardHeaderActions from '@globalbrain/sefirot/lib/components/SCardHeaderActions.vue'
import SCardHeaderTitle from '@globalbrain/sefirot/lib/components/SCardHeaderTitle.vue'
</script>

<template>
  <SCard>
    <SCardHeader>
      <SCardHeaderTitle>
        Header title
      </SCardHeaderTitle>
      <SCardHeaderActions>
        <SCardHeaderActionClose />
      </SCardHeaderActions>
    </SCardHeader>
    <SCardBlock>
      <p>Lorem ipsum...</p>
    </SCardBlock>
    <SCardFooter>
      <SCardFooterActions>
        <SCardFooterAction mode="mute" label="Cancel" />
        <SCardFooterAction mode="info" label="Submit" />
      </SCardFooterActions>
    </SCardFooter>
  </SCard>
</template>
```

Learn more about each child component's usage in the following sections.

## Header

Use `<SCardHeader>` to display header element.

`<SCardHeaderTitle>` allows you to display the title text.

```vue-html
<SCard>
  <SCardHeader>
    <SCardHeaderTitle>
      Header title
    </SCardHeaderTitle>
  </SCardHeader>
</SCard>
```

### Actions

You may use `<SCardHeaderActions>` with nested `<SCardHeaderAction>` to add header actions. `<SCardHeaderAction>` accepts following props, and emits `@click` event when user clicks on the button.

It uses [`<SButton>`](./button) component internally. Refer to the documentation of `<SButton>` for how the props work.

```ts
import { type IconifyIcon } from '@iconify/vue/dist/offline'

interface Props {
  icon: IconifyIcon
  disabled?: boolean
  tooltip?: Tooltip
}

export interface Tooltip {
  tag?: string
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

### Spacing

For combinience, `<SCardBlock>` component comes with `:space` props that lets you control the padding of the block. You may pass either `compact` or `wide` as a value.

```ts
interface Props {
  space?: 'compact' | 'wide'
}
```

```vue-html
<SCard>
  <SCardBlock space="compact">
    <p>Lorem ipsum...</p>
  </SCardBlock>
</SCard>
```

The spacing should be consistant across the application depending on the size of the `<SCard>` component. Use `compact` for  card width smaller than `640px`, and `wide` for larger width.

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

### Actions

`<SCardFooterAction>` accepts following props. As same as `<SCardHeaderAction>`, it uses [`<SButton>`](./button) component internally. Refer to the documentation of `<SButton>` for how the props work.

```ts
interface Props {
  mode?: Mode
  label?: string
  labelMode?: Mode
  loading?: boolean
  disabled?: boolean
  tooltip?: Tooltip
}

export interface Tooltip {
  tag?: string
  text?: MaybeRef<string>
  position?: Position
  trigger?: 'hover' | 'focus' | 'both'
  timeout?: number
}
```

### Spacing

Same as, `<SCardBlock>`, `<SCardFooter>` also comes with `:space` props that lets you control the padding of the block. You may pass either `compact` or `wide` as a value.

```ts
interface Props {
  space?: 'compact' | 'wide'
}
```

```vue-html
<SCard>
  <SCardFooter space="compact">
    ...
  </SCardFooter>
</SCard>
```

To ensure consistent spacing across the application, you should adjust the spacing based on the size of the `<SCard>` component. Consider using the `compact` class for card widths smaller than `640px` and the `wide` class for larger widths.

It's important to align this spacing with the `<SCardBlock>` component to ensure proper alignment between the block contents and the footer contents, such as actions.
