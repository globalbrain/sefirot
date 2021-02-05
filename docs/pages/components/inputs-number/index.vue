<template lang="md">
# Inputs: Number

Number input let users enter and edit single line number.

<StoryInputNumberShowcase />

## Examples

### SeparatorHelp

You can show the input number with thousand separator under the input by passing `separator-help` props.

<StoryInputNumberEXSeparatorHelp />

## API

<SpecProps :props="props" />
<SpecEvents :events="events" />
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import StoryInputNumberShowcase from '@/components/StoryInputNumberShowcase.vue'
import StoryInputNumberEXSeparatorHelp from '@/components/StoryInputNumberEXSeparatorHelp.vue'
import SpecProps, { Prop } from '@/components/SpecProps.vue'
import SpecEvents, { Event } from '@/components/SpecEvents.vue'

export default defineComponent({
  components: {
    StoryInputNumberShowcase,
    StoryInputNumberEXSeparatorHelp,
    SpecProps,
    SpecEvents
  },

  scrollToTop: true,

  setup() {
    const props: Prop[] = [
      {
        name: 'size',
        type: "'medium' | 'mini'",
        required: false,
        default: 'medium',
        description: 'The size of the input.'
      },
      {
        name: 'mode',
        type: "'filled' | 'outlined'",
        required: false,
        default: 'filled',
        description: 'The style of the input.'
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
        name: 'placeholder',
        type: 'string',
        required: false,
        default: 'null',
        description: 'The placeholder text for the input.'
      },
      {
        name: 'text',
        type: 'string',
        required: false,
        default: 'null',
        description: 'Add the leading text to the input.'
      },
      {
        name: 'text-after',
        type: 'string',
        required: false,
        default: 'null',
        description: 'Add the trailing text to the input.'
      },
      {
        name: 'separator-help',
        type: 'boolean',
        required: false,
        default: 'false',
        description: 'The input value with thousand separator that will be displayed under the input.'
      },
      {
        name: 'value',
        type: 'number',
        required: false,
        default: 'null',
        description: 'The value of input. You may also use `v-model` to bind a value to the input.'
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
        description: 'Fires when a user input any value to the filed.'
      },
      {
        name: 'blur',
        description: 'Fires when a user blur focus from the filed.'
      },
      {
        name: 'enter',
        description: 'Fires when the user hit enter key.'
      }
    ]

    return {
      props,
      events
    }
  },

  head: {
    title: 'Inputs: Number'
  }
})
</script>
