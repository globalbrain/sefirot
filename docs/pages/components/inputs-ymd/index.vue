<template lang="md">
# Inputs: YMD

YMD input let users enter and edit year, month, and date value in number format.

<StoryInputYMDShowcase />

## Sizes

The YMD input comes in several different sizes. You may pass `size` prop to control the size of the input. Supported sizes are `mini`, `small` and `medium`. The default size is set to `medium`.

<StoryInputYMDEXSizes />

## API

<SpecProps :props="props" />
<SpecEvents :events="events" />
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import StoryInputYMDShowcase from '@/components/inputs/StoryInputYMDShowcase.vue'
import StoryInputYMDEXSizes from '@/components/inputs/StoryInputYMDEXSizes.vue'
import SpecProps from '@/components/SpecProps.vue'
import SpecEvents from '@/components/SpecEvents.vue'
import { useSpec } from '@/composables/Spec'

export default defineComponent({
  components: {
    StoryInputYMDShowcase,
    StoryInputYMDEXSizes,
    SpecProps,
    SpecEvents
  },

  scrollToTop: true,

  setup() {
    return useSpec({
      props: [
        {
          name: 'date',
          type: 'boolean',
          required: false,
          default: 'true',
          description: 'Whether to display "date" input or not.'
        },
        {
          name: 'disabled',
          type: 'boolean',
          required: false,
          default: 'false',
          description: 'Disable the input.'
        },
        {
          name: 'size',
          type: "'mini' | 'small'",
          required: false,
          default: 'small',
          description: 'The size of the input.'
        },
        {
          name: 'mode',
          type: "'outlined'",
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
          name: 'month',
          type: 'boolean',
          required: false,
          default: 'true',
          description: 'Whether to display "month" input or not.'
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
          name: 'value',
          type: 'YearMonthDate',
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
        },
        {
          name: 'yaer',
          type: 'boolean',
          required: false,
          default: 'true',
          description: 'Whether to display "year" input or not.'
        }
      ],

      events: [
        {
          name: 'input',
          description: 'Fires when a user input any value to the filed.'
        }
      ]
    })
  },

  head: {
    title: 'Inputs: YMDr'
  }
})
</script>
