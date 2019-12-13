<template lang="md">
# Inputs: Switches

Switches toggle the state of a single setting on or off.

<ShowcaseSwitches />

## API

<SpecProps :props="props" />
<SpecEvents :events="events" />
</template>

<script>
import ShowcaseSwitches from '@/components/stories/inputs/ShowcaseSwitches'
import SpecProps from '@/components/specs/SpecProps'
import SpecEvents from '@/components/specs/SpecEvents'

export default {
  components: {
    ShowcaseSwitches,
    SpecProps,
    SpecEvents
  },

  data () {
    return {
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
          name: 'help',
          type: 'String',
          required: false,
          default: 'null',
          description: 'The help text that will be displayed under the input. Useful to add a little detailed information about the input.'
        },
        {
          name: 'options',
          type: 'Array',
          required: true,
          default: '—',
          description: 'The available options for the switch group. The array should contain object with properties of `label` and `value`. `label` is used as a text for the radio button, and `value` is the value corresponding to the radio button.'
        },
        {
          name: 'value',
          type: 'Array',
          required: true,
          default: '—',
          description: 'The currently selcted values of the switch group.'
        }
      ],

      events: [
        {
          name: 'change',
          description: 'Fires when a user clicks a switch.'
        }
      ]
    }
  },

  head: {
    title: 'Inputs: Switches'
  },

  scrollToTop: true
}
</script>
