<template>
  <StoryBase
    class="StorySInputText"
    name="SInputText"
    path="@globalbrain/sefirot/lib/components/inputs/SInputText"
    :props="props"
    :events="events"
  >
    <template #component>
      <div class="section">
        <p class="section-title">Filled Input</p>

        <SInputText
          name="input01"
          label="Label"
          note="Note text"
          help="This is a help text."
          placeholder="Placeholder text."
          :validation="$v.form.input01"
          v-model="form.input01"
        />
      </div>
    </template>
  </StoryBase>
</template>

<script>
import Rules from '@@/lib/validation/rules/Rules'
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
          description: 'The help text that will be displayed under the input. Usefull to add a little detailed information about the input.'
        },
        {
          name: 'placeholder',
          type: 'String',
          required: false,
          default: 'null',
          description: 'The placeholder text for the input.'
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

<style lang="postcss" scoped>
.group {
  display: flex;
}

.input {
  flex-shrink: 0;
  width: calc((100% / 3) * 2);
}

.action {
  flex-shrink: 0;
  width: calc(100% / 1);
}
</style>
