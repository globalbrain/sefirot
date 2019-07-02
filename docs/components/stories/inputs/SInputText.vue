<template>
  <StoryBase
    class="StorySInputText"
    name="SInputText"
    path="@globalbrain/sefirot/lib/components/inputs/SInputText"
    :props="props"
    :events="events"
  >
    <template #component>
      <section>
        <h3>Filled Input</h3>

        <SInputText
          name="input01"
          label="Label"
          note="Note text"
          help="This is a help text."
          placeholder="Placeholder text."
          :validation="$v.form.input01"
          :actions="actions"
          v-model="form.input01"
        />
      </section>

      <section>
        <h3>With Icon &amp; Clear Button</h3>

        <div class="input">
          <SInputText
            name="input02"
            label="Label"
            placeholder="Placeholder text."
            :icon="icon02"
            :clearable="true"
            @clear="form.input02 = ''"
            v-model="form.input02"
          />
        </div>
      </section>
    </template>
  </StoryBase>
</template>

<script>
import Rules from '@@/lib/validation/rules/Rules'
import SIconSearch from '@@/lib/components/icons/SIconSearch'
import SInputText from '@@/lib/components/inputs/SInputText'
import StoryBase from '@/components/stories/StoryBase'

export default {
  components: {
    SInputText,
    StoryBase
  },

  data () {
    return {
      form: {
        input01: '',
        input02: ''
      },

      actions: [
        { type: 'secondary', label: 'RESET', callback: this.reset },
        { type: 'primary', label: 'VALIDATE', callback: this.submit }
      ],

      icon02: SIconSearch,

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
@import "@/assets/styles/variables";

.input {
  max-width: 320px;
}
</style>
