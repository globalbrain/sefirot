<template>
  <StoryBase
    class="StorySInputCheckbox"
    name="SInputCheckbox"
    path="@globalbrain/sefirot/lib/components/inputs/SInputCheckbox"
    :props="props"
    :events="events"
  >
    <template #component>
      <section>
        <h3 class="section-title">Normal Checkbox</h3>

        <SInputCheckbox
          name="input01"
          label="Label"
          note="Note text"
          text="Text for the checkbox"
          help="This is a help text."
          v-model="form.input01"
        />
      </section>
    </template>
  </StoryBase>
</template>

<script>
import SInputCheckbox from '@@/lib/components/inputs/SInputCheckbox'
import StoryBase from '@/components/stories/StoryBase'

export default {
  components: {
    SInputCheckbox,
    StoryBase
  },

  data () {
    return {
      form: {
        input01: false
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
          name: 'text',
          type: 'String',
          required: false,
          default: 'null',
          description: 'The label text for the checkbox.'
        },
        {
          name: 'help',
          type: 'String',
          required: false,
          default: 'null',
          description: 'The help text that will be displayed under the input. Useful to add a little detailed information about the input.'
        },
        {
          name: 'value',
          type: 'Boolean',
          required: false,
          default: 'null',
          description: 'The value of the input. It must be `true` or `false`.'
        }
      ],

      events: [
        {
          name: 'change',
          description: 'Fires when a user clicks the checkbox.'
        }
      ]
    }
  }
}
</script>
