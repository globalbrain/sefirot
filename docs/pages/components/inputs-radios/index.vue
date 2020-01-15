<template lang="md">
# Inputs: Radios

Radio buttons allow the user to select one option from a set.

<StoryInputRadiosShowcase />

## API

<SpecProps :props="props" />
<SpecEvents :events="events" />
</template>

<script>
import StoryInputRadiosShowcase from '@/components/StoryInputRadiosShowcase'
import SpecProps from '@/components/SpecProps'
import SpecEvents from '@/components/SpecEvents'

export default {
  components: {
    StoryInputRadiosShowcase,
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
          name: 'nullable',
          type: 'Boolean',
          required: false,
          default: 'true',
          description: 'Whether users can check checked radio button to uncheck it or not. It means, users may have no radio button selected for the form.'
        },
        {
          name: 'options',
          type: 'Array',
          required: true,
          default: '—',
          description: 'The available options for the radio button group. The array should contain object with properties of `label` and `value`. `label` is used as a text for the radio button, and `value` is the value corresponding to the radio button.'
        },
        {
          name: 'value',
          type: 'String | Number | Boolean',
          required: false,
          default: '—',
          description: 'The currently selcted value of the radio button group.'
        }
      ],

      events: [
        {
          name: 'change',
          description: 'Fires when a user clicks a radio button.'
        }
      ]
    }
  },

  head: {
    title: 'Inputs: Radios'
  },

  scrollToTop: true
}
</script>
