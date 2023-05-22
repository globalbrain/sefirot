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

You may use `<SCardHeaderActions>` with nested `<SCardHeaderAction>` to add header actions. `<SCardHeaderAction>` accepts following props, and emits `@click` event when user clicks on the button.

```ts
import { type IconifyIcon } from '@iconify/vue/dist/offline'

interface Props {
  // Icon to display.
  icon: IconifyIcon

  // Mark button disabled.
  disabled?: boolean
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

For combinience, `<SCardBlock>` component comes with `:space` props that lets you control the padding of the block. You may pass wither `compact` or `wide` as a value.

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

If you need to adjust the padding responsively, you may use `--card-padding` css variable to control them.

```vue
<template>
  <SCard class="card">
    <SCardBlock space="compact">
      <p>Lorem ipsum...</p>
    </SCardBlock>
  </SCard>
</template>

<style scoped lang="postcss">
.card {
  --card-padding: 24px;
}
</style>
```

## Footer

Similar to `<SCardHeader>`, use `<SCardFooter>` to add the "footer" section of the card. `<SCardFooter>` comes with nested `<SCardFooterActions>` and `<SCardFooterAction>` to display action buttons.

`<SCardFooterAction>` accepts following props.

```ts
interface Props {
  mode?: Mode
  label?: string
  labelMode?: Mode
  loading?: boolean
  disabled?: boolean
}
```

```vue-html
<SCard>
  <SCardFooterActions>
    <SCardFooterAction
      mode="mute"
      label="Cancel"
      @click="onClick"
    />
    <SCardFooterAction
      mode="info"
      label="Submit"
      @click="onClick"
    />
  </SCardFooter>
</SCard>
```
