<template lang="md">
# Inputs: Switch

Switches toggle the state of a single setting on or off.

<StoryInputSwitchShowcase />

## API

<SpecProps :props="props" />
<SpecEvents :events="events" />
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import StoryInputSwitchShowcase from '@/components/StoryInputSwitchShowcase.vue'
import SpecProps, { Prop } from '@/components/SpecProps.vue'
import SpecEvents, { Event } from '@/components/SpecEvents.vue'

export default defineComponent({
  components: {
    StoryInputSwitchShowcase,
    SpecProps,
    SpecEvents
  },

  scrollToTop: true,

  setup() {
    const props: Prop[] = [
      {
        name: 'size',
        type: "'mini' | 'small'",
        required: false,
        default: "'small'",
        description: 'The size of the switch.'
      },
      {
        name: 'mode',
        type: "'neutral' | 'info' | 'success' | 'warning' | 'danger'",
        required: false,
        default: 'neutral',
        description: 'The mode of the switch.'
      },
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
        name: 'text',
        type: 'string',
        required: false,
        default: 'null',
        description: 'The label text for the switch.'
      },
      {
        name: 'help',
        type: 'string',
        required: false,
        default: 'null',
        description: 'The help text that will be displayed under the input. Useful to add a little detailed information about the input.'
      },
      {
        name: 'value',
        type: 'boolean',
        required: true,
        default: '—',
        description: 'The value of the input.'
      }
    ]

    const events: Event[] = [
      {
        name: 'change',
        description: 'Fires when a user clicks the switch.'
      }
    ]

    return {
      props,
      events
    }
  },

  head: {
    title: 'Inputs: Switch'
  }
})
</script>
