<template>
  <StoryBase
    class="StorySInputTextarea"
    name="SInputTextarea"
    path="@globalbrain/sefirot/lib/components/inputs/SInputTextarea"
    :props="props"
    :events="events"
  >
    <template #component>
      <section>
        <h3>Filled Input</h3>

        <SInputTextarea
          name="input01"
          label="Label"
          note="Note text"
          help="This is a help text."
          placeholder="Placeholder text."
          :rows="5"
          :validation="$v.form.input01"
          v-model="form.input01"
        />
      </section>
    </template>
  </StoryBase>
</template>

<script>
import Rules from '@@/lib/validation/rules/Rules'
import SInputTextarea from '@@/lib/components/inputs/SInputTextarea'
import StoryBase from '@/components/stories/StoryBase'

export default {
  components: {
    SInputTextarea,
    StoryBase
  },

  data () {
    return {
      form: {
        input01: ''
      },

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
          name: 'rows',
          type: 'Number',
          required: false,
          default: '3',
          description: 'The rows of the textarea. The minimum height is set to 3 rows, so passing lower value than 3 would not take effect.'
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

  validations: {
    form: {
      input01: {
        required: Rules.required('The field is required.')
      }
    }
  }
}
</script>
