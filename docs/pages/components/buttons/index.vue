<template lang="md">
# Buttons

Buttons allow users to take actions, and make choices, with a single tap.

<StoryButtonShowcase />

## Sizes

Button has 2 sizes, `medium`, `large`, and `jumbo`. You can control the sizes through `size` prop. The default size is `medium`.

<StoryButtonEXMedium />
<StoryButtonEXLarge />
<StoryButtonEXJumbo />

## Rounded Corner

By setting `rounded` prop to `true`, you'll get the rounded button.

<StoryButtonEXRounded />

## Modes

The button comes with various colors, and you can control it through `mode` prop. Available values are `neutral`, `info`, `success`, `warning`, and `danger`.

<StoryButtonEXModes />

## Block Size

By default, buttons are displayed as `inline-block`. By passing a `block` prop, the button becomes a block-level element. Useful for controlling button sizes.

<StoryButtonEXBlock />

## With Icon

You can also prepend icon by passing in Vue Component to the `icon` prop. The button can also be an icon-only button.

<StoryButtonEXIcon />

## Loading State

<StoryButtonEXLoadingState />

## API

<SpecProps :props="props" />
<SpecEvents :events="events" />
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import StoryButtonShowcase from '@/components/StoryButtonShowcase.vue'
import StoryButtonEXMedium from '@/components/StoryButtonEXMedium.vue'
import StoryButtonEXLarge from '@/components/StoryButtonEXLarge.vue'
import StoryButtonEXJumbo from '@/components/StoryButtonEXJumbo.vue'
import StoryButtonEXRounded from '@/components/StoryButtonEXRounded.vue'
import StoryButtonEXModes from '@/components/StoryButtonEXModes.vue'
import StoryButtonEXBlock from '@/components/StoryButtonEXBlock.vue'
import StoryButtonEXIcon from '@/components/StoryButtonEXIcon.vue'
import StoryButtonEXLoadingState from '@/components/StoryButtonEXLoadingState.vue'
import SpecProps, { Prop } from '@/components/SpecProps.vue'
import SpecEvents, { Event } from '@/components/SpecEvents.vue'

export default defineComponent({
  components: {
    StoryButtonShowcase,
    StoryButtonEXMedium,
    StoryButtonEXLarge,
    StoryButtonEXJumbo,
    StoryButtonEXRounded,
    StoryButtonEXModes,
    StoryButtonEXBlock,
    StoryButtonEXIcon,
    StoryButtonEXLoadingState,
    SpecProps,
    SpecEvents
  },

  head: {
    title: 'Buttons'
  },

  scrollToTop: true,

  setup () {
    const props: Prop[] = [
      {
        name: 'label',
        type: 'string',
        required: false,
        default: 'null',
        description: 'The label text for the button.'
      },
      {
        name: 'tag',
        type: 'string',
        required: false,
        default: '\'button\'',
        description: 'The tag for the button. It can be any valid html tag including `nuxt-link`.'
      },
      {
        name: 'to',
        type: 'string',
        required: false,
        default: '\'/\'',
        description: 'The `to` prop for the `nuxt-link` tag. This prop is only useful when `tag` is set to `nuxt-link`.'
      },
      {
        name: 'type',
        type: 'string',
        required: false,
        default: '\'primary\'',
        description: 'The type of the button. Available types are: `primary`, `secondary`, `tertiary`, `text`, and `mute`.'
      },
      {
        name: 'mode',
        type: 'string',
        required: false,
        default: '\'neutral\'',
        description: 'The mode of the button. Available modes are: `neutral`, `info`, `success`, `warning`, and `danger`.'
      },
      {
        name: 'size',
        type: 'string',
        required: false,
        default: '\'medium\'',
        description: 'The size of the button. Available sizes are: `medium`, `large`, and `jumbo`.'
      },
      {
        name: 'icon',
        type: 'VueComponent',
        required: false,
        default: 'null',
        description: 'Adds given Vue Component as an icon for the button.'
      },
      {
        name: 'block',
        type: 'boolean',
        required: false,
        default: 'false',
        description: 'Apply `display: block` to the button.'
      },
      {
        name: 'inverse',
        type: 'boolean',
        required: false,
        default: 'false',
        description: 'Inverse button theme.'
      },
      {
        name: 'loading',
        type: 'boolean',
        required: false,
        default: 'false',
        description: 'Show loading indicator.'
      }
    ]

    const events: Event[] = [
      {
        name: 'click',
        description: 'Fires when an user clicks the button.'
      }
    ]

    return {
      props,
      events
    }
  }
})
</script>
