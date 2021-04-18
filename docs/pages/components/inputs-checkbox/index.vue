<template lang="md">
# Inputs: Checkbox

Checkbox allow the user to select one item. Checkbox can be used to turn an option on or off.

<StoryInputCheckboxShowcase />

## API

<SpecProps :props="props" />
<SpecEvents :events="events" />
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import StoryInputCheckboxShowcase from '@/components/inputs/StoryInputCheckboxShowcase.vue'
import SpecProps from '@/components/SpecProps.vue'
import SpecEvents from '@/components/SpecEvents.vue'
import { useSpec } from '@/composables/Spec'

export default defineComponent({
  components: {
    StoryInputCheckboxShowcase,
    SpecProps,
    SpecEvents
  },

  scrollToTop: true,

  setup() {
    return useSpec({
      props: [
        {
          name: 'name',
          type: 'String',
          required: false,
          default: 'null',
          description: 'The name for the field. It will be set to `for` attribute at label, and `id` attribute at input so that when user clicks the label, the input will get focus.'
        },
        {
          name: 'label',
          type: 'String',
          required: false,
          default: 'null',
          description: 'The label for the input.'
        },
        {
          name: 'note',
          type: 'String',
          required: false,
          default: 'null',
          description: 'The small note text that will be displayed next to label. The note should be short for example `Optional` or `Max length 160`.'
        },
        {
          name: 'text',
          type: 'String',
          required: false,
          default: 'null',
          description: 'The label text for the checkbox.'
        },
        {
          name: 'help',
          type: 'String',
          required: false,
          default: 'null',
          description: 'The help text that will be displayed under the input. Useful to add a little detailed information about the input.'
        },
        {
          name: 'value',
          type: 'Boolean',
          required: false,
          default: 'null',
          description: 'The value of the input. It must be `true` or `false`.'
        }
      ],

      events: [
        {
          name: 'change',
          description: 'Fires when a user clicks the checkbox.'
        }
      ]
    })
  },

  head: {
    title: 'Inputs: Checkbox'
  }
})
</script>
