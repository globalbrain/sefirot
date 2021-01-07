<template lang="md">
# Inputs: Dropdown

Dropdown input let users choose items from the list of options. The difference between Select input is that Dropdown input provides more options, such as multiselect, custom template for the selected and option items, etc.

<StoryInputDropdownShowcase />

## API

<SpecProps :props="props" />
<SpecEvents :events="events" />
</template>

<script>
import StoryInputDropdownShowcase from '@/components/StoryInputDropdownShowcase'
import SpecProps from '@/components/SpecProps'
import SpecEvents from '@/components/SpecEvents'

export default {
  components: {
    StoryInputDropdownShowcase,
    SpecProps,
    SpecEvents
  },

  scrollToTop: true,

  data () {
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
          type: "'filled' | 'outlined'",
          required: false,
          default: "'filled'",
          description: 'The style of the input.'
        },
        {
          name: 'name',
          type: 'string',
          required: false,
          default: 'null',
          description: 'The name for the field. It will be set to `for` attribute at label, and `id` attribute at input.'
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
          description: 'The placeholder text for the input. The placeholder will be added as a disabled option for the select input and displayed only when the `value` is not set.'
        },
        {
          name: 'search',
          type: 'Search',
          required: false,
          default: 'null',
          description: 'The search option object.'
        },
        {
          name: 'nullable',
          type: 'boolean',
          required: false,
          default: 'true',
          description: 'Whether the selected item can be null or not.'
        },
        {
          name: 'options',
          type: 'Dropdown.Item[]',
          required: true,
          default: '—',
          description: 'The available options for the dropdown list. The array should contain `Dropdown.Item` objects.'
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
          type: 'any',
          required: false,
          default: 'null',
          description: 'The value of the input. You may also use `v-model` to bind a value to the input.'
        }
      ],

      events: [
        {
          name: 'change',
          description: 'Fires when a user selects an option. It will pass the `value` of the selected option as the first argument.'
        }
      ]
    }
  },

  head: {
    title: 'Inputs: Dropdown'
  }
}
</script>
