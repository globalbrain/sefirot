<template lang="md">
# Inputs: Date

Dates input let users enter and edit year, month, and date.

<ShowcaseDate />

## API

<SpecProps :props="props" />
<SpecEvents :events="events" />
</template>

<script>
import ShowcaseDate from '@/components/stories/inputs/ShowcaseDate'
import SpecProps from '@/components/specs/SpecProps'
import SpecEvents from '@/components/specs/SpecEvents'

export default {
  components: {
    ShowcaseDate,
    SpecProps,
    SpecEvents
  },

  head: {
    title: 'Inputs: Dates'
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
          description: 'The name for the field. It will be set to `for` attribute at label.'
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
          description: 'The small note text that will be displayed next to label. The note should be short for example `Required` or `Optional`.'
        },
        {
          name: 'help',
          type: 'String',
          required: false,
          default: 'null',
          description: 'The help text that will be displayed under the input. Useful to add a little detailed information about the input.'
        },
        {
          name: 'min-date',
          type: 'Date',
          required: false,
          default: 'null',
          description: 'The minimum date that users may select from the calendar.'
        },
        {
          name: 'max-date',
          type: 'Date',
          required: false,
          default: 'null',
          description: 'The maximum date that users may select from the calendar.'
        },
        {
          name: 'available-dates',
          type: 'Object',
          required: false,
          default: 'null',
          description: 'Available dates configuration. See V Calendar documentation for the detail. https://vcalendar-legacy.netlify.com/datepicker.html#disable-dates--patterns'
        },
        {
          name: 'disabled-dates',
          type: 'Object',
          required: false,
          default: 'null',
          description: 'Disabled dates configuration. See V Calendar documentation for the detail. https://vcalendar-legacy.netlify.com/datepicker.html#disable-dates--patterns'
        },
        {
          name: 'value',
          type: 'Date',
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
          description: 'Fires when a user selects or input a date.'
        }
      ]
    }
  }
}
</script>
