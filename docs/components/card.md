---
outline: deep
---

<script setup lang="ts">
import SButton from 'sefirot/components/SButton.vue'
import SCard from 'sefirot/components/SCard.vue'
import SCardBlock from 'sefirot/components/SCardBlock.vue'
import SCardFooter from 'sefirot/components/SCardFooter.vue'
import SContent from 'sefirot/components/SContent.vue'
</script>

# SCard

`<SCard>` is a compositional container for grouped content, form sections, and modal dialogs. Use `<SCardBlock>` for individual sections and `<SCardFooter>` for trailing actions.

<Showcase
  path="/components/SCard.vue"
  story="/stories-components-scard-01-playground-story-vue"
>
  <div class="flex flex-wrap gap-12">
    <SCard>
      <SCardBlock class="s-p-24">
        <SContent>
          <h2>Consectetur adipisicing</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat.
          </p>
        </SContent>
      </SCardBlock>
      <SCardFooter class="s-py-16 s-px-24">
        <SButton size="md" label="Cancel" />
        <SButton size="md" mode="info" label="Submit" />
      </SCardFooter>
    </SCard>
  </div>
</Showcase>

## Usage

Combine `<SCard>` with `<SCardBlock>` and `<SCardFooter>` to build simple card layouts.

```vue
<script setup lang="ts">
import SButton from '@globalbrain/sefirot/lib/components/SButton.vue'
import SCard from '@globalbrain/sefirot/lib/components/SCard.vue'
import SCardBlock from '@globalbrain/sefirot/lib/components/SCardBlock.vue'
import SCardFooter from '@globalbrain/sefirot/lib/components/SCardFooter.vue'
import SContent from '@globalbrain/sefirot/lib/components/SContent.vue'
</script>

<template>
  <SCard>
    <SCardBlock class="s-p-24">
      <SContent>
        <h2>Consectetur adipisicing</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat.
        </p>
      </SContent>
    </SCardBlock>
    <SCardFooter class="s-py-16 s-px-24">
      <SButton size="md" label="Cancel" />
      <SButton size="md" mode="info" label="Submit" />
    </SCardFooter>
  </SCard>
</template>
```

Learn more about each child component's usage in the following sections.

## Anatomy

- `<SCard>`: Root container that controls the card mode, muted state, and modal width.
- `<SCardBlock>`: Generic section for content, headings, or fixed-height rows.
- `<SCardFooter>`: Right-aligned footer row, typically used for actions.

## `<SCard>`

`<SCard>` is the root component of the card. Place all card sections within this component.

### Props

```ts
interface Props {
  /**
   * Controls the card width when rendered inside `<SModal>`.
   * 
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large' | 'xlarge' | 'xxlarge'

  /**
   * Changes the card border color for contextual states.
   * 
   * @default 'neutral'
   */
  mode?: 'neutral' | 'info' | 'success' | 'warning' | 'danger'

  /**
   * Applies muted background styling to direct `<SCardBlock>` children.
   * 
   * @default false
   */
  muted?: boolean
}
```

### Slots

- `default`: Card content. Use `<SCardBlock>` for sections, and place `<SCardFooter>` last when you need footer actions.

### Special use case

Render `<SCard>` inside `<SModal>` and pass `:size` when you want the card to define the dialog width.

```vue-html
<SModal :open="open" @close="open = false">
  <SCard size="small">
    <SCardBlock class="s-p-24">
      ...
    </SCardBlock>
  </SCard>
</SModal>
```

### Layout notes

The card stacks its direct children vertically with a 1px divider between sections. To preserve the rounded bottom edge, the last child should usually be either `<SCardBlock>` or `<SCardFooter>`.

## `<SCardBlock>`

Use `<SCardBlock>` for general-purpose sections inside a card. Omit `:size` for content that should grow naturally, and add it for fixed-height rows such as toolbars or compact headers.

### Props

```ts
interface Props {
  /**
   * Applies a fixed height to the block.
   */
  size?: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge'

  /**
   * Changes the background color of the block.
   * 
   * @default '1'
   */
  bg?: '1' | '2' | '3' | 'elv-1' | 'elv-2' | 'elv-3' | 'elv-4' | 'none'
}
```

### Slots

- `default`: Block content.

### Layout notes

Add padding with utility classes such as `s-px-24` and `s-py-16` to control the internal spacing. Keep the horizontal padding aligned with `<SCardFooter>` when those sections appear together.

## `<SCardFooter>`

Use `<SCardFooter>` as the last child of `<SCard>` to render actions or other footer content. The footer is a flex container that aligns its children to the right and applies the card's bottom background and border radius.

### Props

`<SCardFooter>` does not provide any component-specific props.

### Slots

- `default`: Footer content such as action buttons or supplementary controls.

### Layout notes

Apply spacing with utility classes such as `s-px-24` and `s-py-16` so the footer contents align with the surrounding `<SCardBlock>` content. When you place multiple children inside the footer, they are displayed in a right-aligned row with a consistent gap.
