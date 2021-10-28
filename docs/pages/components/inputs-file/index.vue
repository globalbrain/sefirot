<template lang="md">
# Inputs: File

The file input let users upload a file.

<StoryInputFileShowcase />

## Sizes

The file input comes in several different sizes. You may pass `size` prop to control the size of the input. Supported sizes are `mini`, `small` and `medium`. The default size is set to `small`.

<StoryInputFileEXSizes />

## API

<SpecProps :props="props" />
<SpecEvents :events="events" />
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import StoryInputFileShowcase from '@/components/inputs/StoryInputFileShowcase.vue'
import StoryInputFileEXSizes from '@/components/inputs/StoryInputFileEXSizes.vue'
import SpecProps from '@/components/SpecProps.vue'
import SpecEvents from '@/components/SpecEvents.vue'
import { useSpec } from '@/composables/Spec'

export default defineComponent({
  components: {
    StoryInputFileShowcase,
    StoryInputFileEXSizes,
    SpecProps,
    SpecEvents
  },

  scrollToTop: true,

  setup() {
    return useSpec({
      props: [
        {
          name: 'error-message',
          type: 'boolean',
          required: false,
          default: 'true',
          description: 'Whether to display error message when validation fails.'
        },
        {
          name: 'help',
          type: 'string',
          required: false,
          default: 'null',
          description: 'The help text that will be displayed under the input. Useful to add a little detailed information about the input.'
        },
        {
          name: 'label',
          type: 'string',
          required: false,
          default: 'null',
          description: 'The label for the input.'
        },
        {
          name: 'name',
          type: 'string',
          required: false,
          default: 'null',
          description: 'The name for the field. It will be set to `for` attribute at label.'
        },
        {
          name: 'note',
          type: 'string',
          required: false,
          default: 'null',
          description: 'The small note text that will be displayed next to the label.'
        },
        {
          name: 'placeholder',
          type: 'string',
          required: false,
          default: 'null',
          description: 'The placeholder text for the input.'
        },
        {
          name: 'size',
          type: "'mini' | 'small' | 'medium'",
          required: false,
          default: "'small'",
          description: 'The size of the input.'
        },
        {
          name: 'text',
          type: 'string',
          required: false,
          default: "'Choose File'",
          description: 'The text for the input button.'
        },
        {
          name: 'validation',
          type: 'Validation',
          required: false,
          default: 'null',
          description: 'You can pass Validation object to let input display any errors.'
        },
        {
          name: 'value',
          type: 'File | null',
          required: false,
          default: 'null',
          description: 'The value of the input. You may also use `v-model` to bind a value to the input.'
        }
      ],

      events: [
        {
          name: 'input',
          description: 'Fires when the user selects a file.'
        }
      ]
    })
  },

  head: {
    title: 'Inputs: File'
  }
})
</script>
