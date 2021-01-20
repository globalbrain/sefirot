<template lang="md">
# Inputs: Switches

Switches toggle the state of a single setting on or off.

<StoryInputSwitchesShowcase />

## API

<SpecProps :props="props" />
<SpecEvents :events="events" />
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import StoryInputSwitchesShowcase from '@/components/StoryInputSwitchesShowcase.vue'
import SpecProps, { Prop } from '@/components/SpecProps.vue'
import SpecEvents, { Event } from '@/components/SpecEvents.vue'

export default defineComponent({
  components: {
    StoryInputSwitchesShowcase,
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
        name: 'help',
        type: 'string',
        required: false,
        default: 'null',
        description: 'The help text that will be displayed under the input. Useful to add a little detailed information about the input.'
      },
      {
        name: 'options',
        type: 'Option[]',
        required: true,
        default: '—',
        description: 'The available options for the switch group. The array should contain object with properties of `label` and `value`. `label` is used as a text for the switch, and `value` is the value corresponding to the switch.'
      },
      {
        name: 'value',
        type: 'any[]',
        required: true,
        default: '—',
        description: 'The currently selcted values of the switch group.'
      }
    ]

    const events: Event[] = [
      {
        name: 'change',
        description: 'Fires when a user clicks a switch.'
      }
    ]

    return {
      props,
      events
    }
  },

  head: {
    title: 'Inputs: Switches'
  }
})
</script>
