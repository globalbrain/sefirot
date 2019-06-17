<template>
  <StoryBase
    class="StorySInputSwitches"
    name="SInputSwitches"
    path="@globalbrain/sefirot/lib/components/inputs/SInputSwitches"
    :props="props"
    :events="events"
  >
    <template #component>
      <section>
        <h3 class="section-title">Normal Switches</h3>

        <SInputSwitches
          name="input01"
          label="Label"
          note="Note text"
          help="This is a help text."
          :options="options01"
          v-model="form.input01"
        />
      </section>
    </template>
  </StoryBase>
</template>

<script>
import SInputSwitches from '@@/lib/components/inputs/SInputSwitches'
import StoryBase from '@/components/stories/StoryBase'

export default {
  components: {
    SInputSwitches,
    StoryBase
  },

  data () {
    return {
      form: {
        input01: [2]
      },

      options01: [
        { label: 'Switch 1', value: 1 },
        { label: 'Switch 2', value: 2 },
        { label: 'Switch 3', value: 3 }
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
          name: 'help',
          type: 'String',
          required: false,
          default: 'null',
          description: 'The help text that will be displayed under the input. Useful to add a little detailed information about the input.'
        },
        {
          name: 'options',
          type: 'Array',
          required: true,
          default: '—',
          description: 'The available options for the switch group. The array should contain object with properties of `label` and `value`. `label` is used as a text for the radio button, and `value` is the value corresponding to the radio button.'
        },
        {
          name: 'value',
          type: 'Array',
          required: true,
          default: '—',
          description: 'The currently selcted values of the switch group.'
        }
      ],

      events: [
        {
          name: 'change',
          description: 'Fires when a user clicks a switch.'
        }
      ]
    }
  }
}
</script>
