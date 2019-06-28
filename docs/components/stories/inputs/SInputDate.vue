<template>
  <StoryBase
    class="StorySInputDate"
    name="SInputText"
    path="@globalbrain/sefirot/lib/components/inputs/SInputDate"
    :props="props"
    :events="events"
  >
    <template #component>
      <section>
        <h3>Filled Input</h3>

        <div class="input">
          <SInputDate
            name="input01"
            label="Label"
            note="Note text"
            help="This is a help text."
            :validation="$v.form.input01"
            v-model="form.input01"
          />
        </div>
      </section>

      <section>
        <h3>Min/Max Dates</h3>

        <div class="input">
          <SInputDate
            name="input02"
            label="Label"
            :min-date="minDate02"
            :max-date="maxDate02"
            v-model="form.input02"
          />
        </div>
      </section>
    </template>
  </StoryBase>
</template>

<script>
import Day from 'dayjs'
import Rules from '@@/lib/validation/rules/Rules'
import SInputDate from '@@/lib/components/inputs/SInputDate'
import StoryBase from '@/components/stories/StoryBase'

export default {
  components: {
    SInputDate,
    StoryBase
  },

  data () {
    return {
      form: {
        input01: null,
        input02: null
      },

      minDate02: Day().subtract(1, 'month').toDate(),
      maxDate02: Day().add(1, 'month').toDate(),

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
  },

  validations: {
    form: {
      input01: {
        required: Rules.required('The field is required.')
      }
    }
  },

  methods: {
    submit () {
      this.$v.$touch()
    },

    reset () {
      this.form.input01 = null

      this.$v.$reset()
    }
  }
}
</script>

<style lang="postcss" scoped>
.input {
  width: 192px;
}
</style>
