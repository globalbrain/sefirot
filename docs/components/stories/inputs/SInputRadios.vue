<template>
  <StoryBase
    class="StorySInputRadios"
    name="SInputRadios"
    path="@globalbrain/sefirot/lib/components/inputs/SInputRadios"
    :props="props"
    :events="events"
  >
    <template #component>
      <section>
        <h3 class="section-title">Normal Radios</h3>

        <SInputRadios
          name="input01"
          label="Label"
          note="Note text"
          help="This is a help text."
          :nullable="false"
          :options="options01"
          v-model="form.input01"
        />
      </section>

      <section>
        <h3 class="section-title">Nullable Radios</h3>

        <SInputRadios
          name="input02"
          label="Label"
          :nullable="true"
          :options="options02"
          v-model="form.input02"
        />
      </section>
    </template>
  </StoryBase>
</template>

<script>
import SInputRadios from '@@/lib/components/inputs/SInputRadios'
import StoryBase from '@/components/stories/StoryBase'

export default {
  components: {
    SInputRadios,
    StoryBase
  },

  data () {
    return {
      form: {
        input01: 1,
        input02: null
      },

      options01: [
        { label: 'Radio button 1', value: 1 },
        { label: 'Radio button 2', value: 2 },
        { label: 'Radio button 3', value: 3 }
      ],

      options02: [
        { label: 'Radio button 1', value: 1 },
        { label: 'Radio button 2', value: 2 },
        { label: 'Radio button 3', value: 3 }
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
          name: 'nullable',
          type: 'Boolean',
          required: false,
          default: 'true',
          description: 'Whether users can check checked radio button to uncheck it or not. It means, users may have no radio button selected for the form.'
        },
        {
          name: 'options',
          type: 'Array',
          required: true,
          default: '—',
          description: 'The available options for the radio button group. The array should contain object with properties of `label` and `value`. `label` is used as a text for the radio button, and `value` is the value corresponding to the radio button.'
        },
        {
          name: 'value',
          type: 'String | Number | Boolean',
          required: false,
          default: '—',
          description: 'The currently selcted value of the radio button group.'
        }
      ],

      events: [
        {
          name: 'change',
          description: 'Fires when a user clicks a radio button.'
        }
      ]
    }
  }
}
</script>
