<template lang="md">
# Inputs: Date

Date input let users select date from the calendar.

<StoryInputDateShowcase />

## API

<SpecProps :props="props" />
<SpecEvents :events="events" />
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import StoryInputDateShowcase from '@/components/StoryInputDateShowcase.vue'
import SpecProps, { Prop } from '@/components/SpecProps.vue'
import SpecEvents, { Event } from '@/components/SpecEvents.vue'

export default defineComponent({
  components: {
    StoryInputDateShowcase,
    SpecProps,
    SpecEvents
  },

  scrollToTop: true,

  setup() {
    const props: Prop[] = [
      {
        name: 'name',
        type: 'string',
        required: false,
        default: 'null',
        description: 'The name for the field. It will be set to `for` attribute at label, and `id` attribute at input so that when user clicks the label, the input will get focus.'
      },
      {
        name: 'label',
        type: 'string',
        required: false,
        default: 'null',
        description: 'The label for the input.'
      },
      {
        name: 'note',
        type: 'string',
        required: false,
        default: 'null',
        description: 'The small note text that will be displayed next to label. The note should be short for example `Optional` or `Max length 160`.'
      },
      {
        name: 'help',
        type: 'string',
        required: false,
        default: 'null',
        description: 'The help text that will be displayed under the input. Useful to add a little detailed information about the input.'
      },
      {
        name: 'placeholder',
        type: 'string',
        required: false,
        default: 'null',
        description: 'The placeholder text for the input.'
      },
      {
        name: 'value',
        type: 'Date',
        required: false,
        default: 'null',
        description: 'The value of the input. You may also use `v-model` to bind a value to the input.'
      },
      {
        name: 'validation',
        type: 'Validation',
        required: false,
        default: 'null',
        description: 'You can pass Validation object to let input display any errors.'
      }
    ]

    const events: Event[] = [
      {
        name: 'input',
        description: 'Fires when the user input any value to the filed.'
      },
      {
        name: 'blur',
        description: 'Fires when the user blur focus from the filed.'
      }
    ]

    return {
      props,
      events
    }
  },

  head: {
    title: 'Inputs: Date'
  }
})
</script>
