<template lang="md">
# Button groups
Button groups allow users to select one of the items.

<StoryButtonGroupShowcase />

## Size
Button groups can appear in many different sizes. By default, buttons will be medium sized.
<StoryButtonGroupExMini />

<StoryButtonGroupExSmall />

<StoryButtonGroupExMedium />

<StoryButtonGroupExLarge />

<StoryButtonGroupExJumbo />

## Mode
Control the color theme of buttons.
<StoryButtonGroupExModes />

## API

<SpecProps :props="props" />
<SpecEvents :events="events" />
</template>

<script lang="ts">
import SpecProps from '@/components/SpecProps.vue'
import SpecEvents from '@/components/SpecEvents.vue'
import { useSpec } from '@/composables/Spec'
import { defineComponent } from '@nuxtjs/composition-api'
import StoryButtonGroupShowcase from '~/components/button-groups/StoryButtonGroupShowcase.vue'
import StoryButtonGroupExMini from '~/components/button-groups/StoryButtonGroupEXMini.vue'
import StoryButtonGroupExSmall from '~/components/button-groups/StoryButtonGroupEXSmall.vue'
import StoryButtonGroupExMedium from '~/components/button-groups/StoryButtonGroupEXMedium.vue'
import StoryButtonGroupExLarge from '~/components/button-groups/StoryButtonGroupEXLarge.vue'
import StoryButtonGroupExJumbo from '~/components/button-groups/StoryButtonGroupEXJumbo.vue'
import StoryButtonGroupExModes from '~/components/button-groups/StoryButtonGroupEXModes.vue'

export default defineComponent({
  components: {
    StoryButtonGroupShowcase,
    StoryButtonGroupExMini,
    StoryButtonGroupExSmall,
    StoryButtonGroupExMedium,
    StoryButtonGroupExLarge,
    StoryButtonGroupExJumbo,
    StoryButtonGroupExModes,
    SpecProps,
    SpecEvents
  },

  scrollToTop: true,

  setup() {
    return useSpec({
      props: [
        {
          name: 'buttons',
          type: 'ButtonGroupsItem[]',
          required: true,
          default: '-',
          description: 'The available buttons for the button groups.  The array should contain object with properties of `label`, `value`, and `mode`. `label` is used as a text for the button, `value` is the value corresponding to the button, and `mode` is the mode variant of the button.'
        },
        {
          name: 'size',
          type: "'mini' | 'small' | 'medium' | 'large' | 'jumbo'",
          required: false,
          default: "'medium'",
          description: 'The size variant for the button group.'
        },
        {
          name: 'value',
          type: 'string',
          required: false,
          default: 'null',
          description: 'The currently selcted values of the button group.'
        }
      ],

      events: [
        {
          name: 'change',
          description: 'Fires when the user click any button of the button group.'
        }
      ]
    })
  },

  head: {
    title: 'Button Groups'
  }
})
</script>
