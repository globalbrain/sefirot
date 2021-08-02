<template lang="md">
# Button Group

Button Group allow users to select one of the buttons. Similar checkboxes, but with look of buttons.

<StoryButtonGroupShowcase />

## Size

Button groups can appear in many different sizes. By default, buttons will be `medium` sized.

<StoryButtonGroupExMini />
<StoryButtonGroupExSmall />
<StoryButtonGroupExMedium />
<StoryButtonGroupExLarge />
<StoryButtonGroupExJumbo />

## Mode

Control the color theme of buttons by defining `mode` property. The default is `neutral`.

<StoryButtonGroupExModes />

## API

<SpecProps :props="props" />
<SpecEvents :events="events" />
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { useSpec } from '@/composables/Spec'
import SpecProps from '@/components/SpecProps.vue'
import SpecEvents from '@/components/SpecEvents.vue'
import StoryButtonGroupShowcase from '@/components/button-group/StoryButtonGroupShowcase.vue'
import StoryButtonGroupExMini from '@/components/button-group/StoryButtonGroupEXMini.vue'
import StoryButtonGroupExSmall from '@/components/button-group/StoryButtonGroupEXSmall.vue'
import StoryButtonGroupExMedium from '@/components/button-group/StoryButtonGroupEXMedium.vue'
import StoryButtonGroupExLarge from '@/components/button-group/StoryButtonGroupEXLarge.vue'
import StoryButtonGroupExJumbo from '@/components/button-group/StoryButtonGroupEXJumbo.vue'
import StoryButtonGroupExModes from '@/components/button-group/StoryButtonGroupEXModes.vue'

export default defineComponent({
  components: {
    SpecProps,
    SpecEvents,
    StoryButtonGroupShowcase,
    StoryButtonGroupExMini,
    StoryButtonGroupExSmall,
    StoryButtonGroupExMedium,
    StoryButtonGroupExLarge,
    StoryButtonGroupExJumbo,
    StoryButtonGroupExModes
  },

  scrollToTop: true,

  setup() {
    return useSpec({
      props: [
        {
          name: 'buttons',
          type: 'ButtonGroupItem[]',
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
          description: 'Fires when the user clicks on any button.'
        }
      ]
    })
  },

  head: {
    title: 'Button Group'
  }
})
</script>
