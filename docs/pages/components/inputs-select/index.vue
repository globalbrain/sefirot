<template lang="md">
# Inputs: Select

Select input let users choose an item from the list of options.

<StoryInputSelectShowcase />

## Outlined Style

Input select also has a outlined style. Pass `mode` prop to control the looks of the input.

<StoryInputSelectEXOutlined />

## Sizes

The select input comes in several different sizes. You may pass `size` prop to control the size of the input.

<StoryInputSelectEXSizes />

## API

<SpecProps :props="props" />
<SpecEvents :events="events" />
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import StoryInputSelectShowcase from '@/components/inputs/StoryInputSelectShowcase.vue'
import StoryInputSelectEXOutlined from '@/components/inputs/StoryInputSelectEXOutlined.vue'
import StoryInputSelectEXSizes from '@/components/inputs/StoryInputSelectEXSizes.vue'
import SpecProps from '@/components/SpecProps.vue'
import SpecEvents from '@/components/SpecEvents.vue'
import { useSpec } from '@/composables/Spec'

export default defineComponent({
  components: {
    StoryInputSelectShowcase,
    StoryInputSelectEXOutlined,
    StoryInputSelectEXSizes,
    SpecProps,
    SpecEvents
  },

  scrollToTop: true,

  setup() {
    return useSpec({
      props: [
        {
          name: 'disabled',
          type: 'boolean',
          required: false,
          default: 'false',
          description: 'Disable the input.'
        },
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
          type: 'String',
          required: false,
          default: 'null',
          description: 'The name for the field. It will be set to `for` attribute at label, and `id` attribute at input.'
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
          description: 'The placeholder text for the input. The placeholder will be added as a disabled option for the select input and displayed only when the `value` is not set.'
        },
        {
          name: 'validation',
          type: 'Vuelidate',
          required: false,
          default: 'null',
          description: 'You can pass Vuelidate validation object to let input display any errors.'
        },
        {
          name: 'options',
          type: 'Array',
          required: true,
          default: '—',
          description: 'The available options for the select options. The array should contain object with properties of `label` and `value`. `label` is used as a text for the radio button, and `value` is the value corresponding to the select option. There is an optional property `disabled` can be used for the select options which should not be displayed.'
        },
        {
          name: 'value',
          type: 'String | Number | Boolean',
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
    })
  },

  head: {
    title: 'Inputs: Select'
  }
})
</script>
