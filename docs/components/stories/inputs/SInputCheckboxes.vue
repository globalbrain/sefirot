<template>
  <StoryBase
    class="StorySInputCheckboxeses"
    name="SInputCheckboxes"
    path="@globalbrain/sefirot/lib/components/inputs/SInputCheckboxes"
    :props="props"
    :events="events"
  >
    <template #component>
      <section>
        <h3 class="section-title">Normal Checkboxes</h3>

        <SInputCheckboxes
          name="input01"
          label="Label"
          note="Note text"
          text="Text for the checkbox"
          help="This is a help text."
          :options="options01"
          v-model="form.input01"
        />
      </section>
    </template>
  </StoryBase>
</template>

<script>
import SInputCheckboxes from '@@/lib/components/inputs/SInputCheckboxes'
import StoryBase from '@/components/stories/StoryBase'

export default {
  components: {
    SInputCheckboxes,
    StoryBase
  },

  data () {
    return {
      form: {
        input01: []
      },

      options01: [
        { label: 'Check box 1', value: 1 },
        { label: 'Check box 2', value: 2 },
        { label: 'Check box 3', value: 3 }
      ],

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
