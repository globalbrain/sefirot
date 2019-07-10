<template lang="md">
# Inputs: Text

Text input let users enter and edit single line text.

<ShowcaseText />

## API

<SpecProps :props="props" />
<SpecEvents :events="events" />
</template>

<script>
import ShowcaseText from '@/components/stories/inputs/ShowcaseText'
import SpecProps from '@/components/specs/SpecProps'
import SpecEvents from '@/components/specs/SpecEvents'

export default {
  components: {
    ShowcaseText,
    SpecProps,
    SpecEvents
  },

  head: {
    title: 'Inputs: Text'
  },

  scrollToTop: true,

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
          name: 'placeholder',
          type: 'String',
          required: false,
          default: 'null',
          description: 'The placeholder text for the input.'
        },
        {
          name: 'icon',
          type: 'Object',
          required: false,
          default: 'null',
          description: 'You may pass Vue Component (probably svg) to display icon in input field.'
        },
        {
          name: 'clearable',
          type: 'Boolean',
          required: false,
          default: 'false',
          description: 'Show the "clear button" at end of input. If a user clicks the button, it fires `clear` event.'
        },
        {
          name: 'validation',
          type: 'Vuelidate',
          required: false,
          default: 'null',
          description: 'You can pass Vuelidate validation object to let input display any errors.'
        },
        {
          name: 'value',
          type: 'String | Number',
          required: false,
          default: 'null',
          description: 'The value of the input. You may also use `v-model` to bind a value to the input.'
        },
        {
          name: 'actions',
          type: 'Array',
          required: false,
          default: 'null',
          description: 'Adds action buttons after the input. The array should contain object with properties of `type`, `label`, and `callback`. `type` and `label` is same as "SButton" props, and `callback` should be a function which will be triggered when users clicks the button.'
        }
      ],

      events: [
        {
          name: 'input',
          description: 'Fires when a user input any value to the filed.'
        },
        {
          name: 'blur',
          description: 'Fires when a user blur focus from the filed.'
        },
        {
          name: 'clear',
          description: 'Fires when a user clicks the clear button. Only fires when `clearable` prop is seto to `true`.'
        }
      ]
    }
  }
}
</script>
