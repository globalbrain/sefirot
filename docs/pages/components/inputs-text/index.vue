<template lang="md">
# Inputs: Text

Text input let users enter and edit single line text.

<StoryInputTextShowcase />

## With Icon

You can supply an icon to the input field by passing in the icon component to the `icon` prop.

<StoryInputTextEXIcon />

## Clearable Input

By setting `clearable` props, the input filed will show the "clear" button when there's any value is set. When the "clear" button is clicked, it will emit the `clear` event. It's up to you to handle the `clear` event. The component will not touch the value passed in.

<StoryInputTextEXClearable />

## API

<SpecProps :props="props" />
<SpecEvents :events="events" />
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api'
import StoryInputTextShowcase from '@/components/StoryInputTextShowcase.vue'
import StoryInputTextEXIcon from '@/components/StoryInputTextEXIcon.vue'
import StoryInputTextEXClearable from '@/components/StoryInputTextEXClearable.vue'
import SpecProps, { Prop } from '@/components/SpecProps.vue'
import SpecEvents, { Event } from '@/components/SpecEvents.vue'

export default createComponent({
  components: {
    StoryInputTextShowcase,
    StoryInputTextEXIcon,
    StoryInputTextEXClearable,
    SpecProps,
    SpecEvents
  },

  setup () {
    const props: Prop[] = [
      {
        name: 'name',
        type: 'string',
        required: false,
        default: 'null',
        description: 'The name for the field. It will be set to `for` attribute at label, and `id` attribute at input so that when user clicks the label, the input will get focus.'
      },
      {
        name: 'type',
        type: 'string',
        required: false,
        default: 'text',
        description: 'The type of the input. It can be any valid html input types such as `email` or `password`.'
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
        name: 'icon',
        type: 'VueComponent',
        required: false,
        default: 'null',
        description: 'You may pass Vue Component (probably svg) to display icon in input field.'
      },
      {
        name: 'clearable',
        type: 'boolean',
        required: false,
        default: 'false',
        description: 'Show the "clear button" at end of input. If a user clicks the button, it fires `clear` event.'
      },
      {
        name: 'value',
        type: 'string | number',
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
      },
      {
        name: 'enter',
        description: 'Fires when the user hit enter key.'
      },
      {
        name: 'clear',
        description: 'Fires when the user clicks the clear button. Only fires when `clearable` prop is set.'
      }
    ]

    return {
      props,
      events
    }
  },

  head: {
    title: 'Inputs: Text'
  },

  scrollToTop: true
})
</script>
