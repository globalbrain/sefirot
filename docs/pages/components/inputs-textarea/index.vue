<template lang="md">
# Inputs: Textarea

Textarea input let users enter and edit multi line text.

<StoryInputTextareaShowcase />

## Examples

### Clear Mode

You can remove the border and background color by setting the `mode` option to `clear`.

<StoryInputTextareaEXClear />

## API

<SpecProps :props="props" />
<SpecEvents :events="events" />
</template>

<script>
import StoryInputTextareaShowcase from '@/components/StoryInputTextareaShowcase'
import StoryInputTextareaEXClear from '@/components/StoryInputTextareaEXClear'
import SpecProps from '@/components/SpecProps'
import SpecEvents from '@/components/SpecEvents'

export default {
  components: {
    StoryInputTextareaShowcase,
    StoryInputTextareaEXClear,
    SpecProps,
    SpecEvents
  },

  scrollToTop: true,

  data() {
    return {
      props: [
        {
          name: 'size',
          type: "'medium' | 'mini'",
          required: false,
          default: "'medium'",
          description: 'The size of the input.'
        },
        {
          name: 'mode',
          type: "'filled' | 'outlined' | 'clear'",
          required: false,
          default: "'filled'",
          description: 'The style of the input.'
        },
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
          name: 'rows',
          type: 'Number',
          required: false,
          default: '3',
          description: 'The rows of the textarea. The minimum height is set to 3 rows, so passing lower value than 3 would not take effect.'
        },
        {
          name: 'mode',
          type: "'default' | 'clear'",
          required: false,
          default: 'default',
          description: 'The mode of the input style. If it’s set to `clear`, it will hide border styles.'
        },
        {
          name: 'value',
          type: 'String | Number',
          required: false,
          default: 'null',
          description: 'The value of the input. You may also use `v-model` to bind a value to the input.'
        },
        {
          name: 'validation',
          type: 'Vuelidate',
          required: false,
          default: 'null',
          description: 'You can pass Vuelidate validation object to let input display any errors.'
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
        }
      ]
    }
  },

  head: {
    title: 'Inputs: Textarea'
  }
}
</script>
