<template lang="md">
# Buttons

Buttons allow users to take actions, and make choices, with a single tap.

<StoryButtonShowcase />

## Sizes

Buttons can appear in many different sizes. By default, buttons will be medium sized.

<StoryButtonEXMini />
<StoryButtonEXSmall />
<StoryButtonEXMedium />
<StoryButtonEXLarge />
<StoryButtonEXJumbo />

## Rounded

Change the appearance of a button with rounded corners.

<StoryButtonEXRounded />

## Modes

Control the color theme of a button.

<StoryButtonEXModes />

## Block

By default, buttons will display as `inline-block`. The `block` prop transforms a button to a block-level element.

<StoryButtonEXBlock />

## Icon

Prepend a button with an icon or use the icon as its only content by omitting `label`.

<StoryButtonEXIcon />

## Loading State

Display a loading indicator. The indicator icon will auto-adjust its contrast depending on the `mode`, `type` and `inverse` props.

<StoryButtonEXLoadingState />

## API

<SpecProps :props="props" />
<SpecEvents :events="events" />
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import StoryButtonShowcase from '@/components/buttons/StoryButtonShowcase.vue'
import StoryButtonEXMini from '@/components/buttons/StoryButtonEXMini.vue'
import StoryButtonEXSmall from '@/components/buttons/StoryButtonEXSmall.vue'
import StoryButtonEXMedium from '@/components/buttons/StoryButtonEXMedium.vue'
import StoryButtonEXLarge from '@/components/buttons/StoryButtonEXLarge.vue'
import StoryButtonEXJumbo from '@/components/buttons/StoryButtonEXJumbo.vue'
import StoryButtonEXRounded from '@/components/buttons/StoryButtonEXRounded.vue'
import StoryButtonEXModes from '@/components/buttons/StoryButtonEXModes.vue'
import StoryButtonEXBlock from '@/components/buttons/StoryButtonEXBlock.vue'
import StoryButtonEXIcon from '@/components/buttons/StoryButtonEXIcon.vue'
import StoryButtonEXLoadingState from '@/components/buttons/StoryButtonEXLoadingState.vue'
import SpecProps from '@/components/SpecProps.vue'
import SpecEvents from '@/components/SpecEvents.vue'
import { useSpec } from '@/composables/Spec'

export default defineComponent({
  components: {
    StoryButtonShowcase,
    StoryButtonEXMini,
    StoryButtonEXSmall,
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

  scrollToTop: true,

  setup() {
    return useSpec({
      props: [
        {
          name: 'label',
          type: 'String',
          required: false,
          default: 'null',
          description: 'The label text for the button.'
        },
        {
          name: 'tag',
          type: 'String',
          required: false,
          default: "'button'",
          description: 'The tag for the button. It can be any valid HTML tag including `router-link` and `nuxt-link`.'
        },
        {
          name: 'to',
          type: 'String',
          required: false,
          default: "'/'",
          description: 'The `to` prop for the `nuxt-link` tag. This prop is only useful when `tag` is set to `nuxt-link`.'
        },
        {
          name: 'type',
          type: 'String',
          required: false,
          default: "'primary'",
          description: "The type variant of the button. Available types are: `'primary'`, `'secondary'`, `'tertiary'`, `'text'`, and `'mute'`."
        },
        {
          name: 'mode',
          type: 'String',
          required: false,
          default: "'neutral'",
          description: "The mode variant of the button. Available modes are: `'neutral'`, `'info'`, `'success'`, `'warning'`, and `'danger'`."
        },
        {
          name: 'size',
          type: 'String',
          required: false,
          default: "'medium'",
          description: "The size variant for the button. Available sizes are: `'mini'`, `'small'`, `'medium'`, `'large'`, and `'jumbo'`"
        },
        {
          name: 'rounded',
          type: 'Boolean',
          required: false,
          default: 'false',
          description: 'Applies a border radius to the button.'
        },
        {
          name: 'icon',
          type: 'VueComponent',
          required: false,
          default: 'null',
          description: 'The icon component to display in the button content.'
        },
        {
          name: 'block',
          type: 'Boolean',
          required: false,
          default: 'false',
          description: 'Applies `display: block` to the button.'
        },
        {
          name: 'inverse',
          type: 'Boolean',
          required: false,
          default: 'false',
          description: 'Inverse the button theme.'
        },
        {
          name: 'loading',
          type: 'Boolean',
          required: false,
          default: 'false',
          description: 'Display the loading indicator.'
        }
      ],

      events: [
        {
          name: 'click',
          description: 'Emitted when the button is clicked.'
        }
      ]
    })
  },

  head: {
    title: 'Buttons'
  }
})
</script>
