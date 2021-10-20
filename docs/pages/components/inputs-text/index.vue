<template lang="md">
# Inputs: Text

Text input let users enter and edit single line text.

<StoryInputTextShowcase />

## Outlined Style

Input text also has a outlined style. Pass `mode` prop to control the looks of the input.

<StoryInputTextEXOutlined />

## Sizes

The text input comes in several different sizes. You may pass `size` prop to control the size of the input.

<StoryInputTextEXSizes />

## Colors

The text input comes in several color types. You may pass `color` prop to control the color of the input.

<StoryInputTextEXColors />

The `color` prop takes callback function to determine the color. The type of the callback function is shown below.

```ts
type Color = 'neutral' | 'info' | 'success' | 'warning' | 'danger'
type ColorCallback = (value: string | number) => Color
```

## With Icon

You can supply an icon to the input field by passing in the icon component to the `icon` prop.

<StoryInputTextEXIcon />

## With Text

You can also supply additional texts to the input field via the `text` and `text-after` props.

<StoryInputTextEXText />

## Action

You may add leading action to the input by passing config to the `action` prop.

<StoryInputTextEXAction />

The `action` props takes the following object.

```ts
interface Action {
  type?: 'button' | 'select'
  icon?: any
  text?: string
  clickable?: boolean
}
```

## Align
The text input comes in several horizontal alignments. You may pass `align` prop to control the alignment of the input.

<StoryInputTextEXAlign />

## Disable

Set `disabled` props to disable the input. While the input is disabled, it will not emit any event.

<StoryInputTextEXDisabled />

## Clearable Input

By setting `clearable` props, the input filed will show the "clear" button when there's any value is set. When the "clear" button is clicked, it will emit the `clear` event. It's up to you to handle the `clear` event. The component will not touch the value passed in.

<StoryInputTextEXClearable />

## API

<SpecProps :props="props" />
<SpecEvents :events="events" />
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import StoryInputTextShowcase from '@/components/inputs/StoryInputTextShowcase.vue'
import StoryInputTextEXOutlined from '@/components/inputs/StoryInputTextEXOutlined.vue'
import StoryInputTextEXSizes from '@/components/inputs/StoryInputTextEXSizes.vue'
import StoryInputTextEXIcon from '@/components/inputs/StoryInputTextEXIcon.vue'
import StoryInputTextEXText from '@/components/inputs/StoryInputTextEXText.vue'
import StoryInputTextEXAction from '@/components/inputs/StoryInputTextEXAction.vue'
import StoryInputTextEXAlign from '@/components/inputs/StoryInputTextEXAlign.vue'
import StoryInputTextEXDisabled from '@/components/inputs/StoryInputTextEXDisabled.vue'
import StoryInputTextEXClearable from '@/components/inputs/StoryInputTextEXClearable.vue'
import SpecProps from '@/components/SpecProps.vue'
import SpecEvents from '@/components/SpecEvents.vue'
import { useSpec } from '@/composables/Spec'
import StoryInputTextEXColors from '~/components/inputs/StoryInputTextEXColors.vue'

export default defineComponent({
  components: {
    StoryInputTextShowcase,
    StoryInputTextEXOutlined,
    StoryInputTextEXSizes,
    StoryInputTextEXColors,
    StoryInputTextEXIcon,
    StoryInputTextEXText,
    StoryInputTextEXAction,
    StoryInputTextEXAlign,
    StoryInputTextEXDisabled,
    StoryInputTextEXClearable,
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
          type: 'string',
          required: false,
          default: 'null',
          description: 'The name for the field. It will be set to `for` attribute at label, and `id` attribute at input so that when user clicks the label, the input will get focus.'
        },
        {
          name: 'type',
          type: 'string',
          required: false,
          default: "'text'",
          description: 'The type of the input. It can be any valid html input types such as `email` or `password`.'
        },
        {
          name: 'label',
          type: 'string',
          required: false,
          default: 'null',
          description: 'The label for the input.'
        },
        {
          name: 'note',
          type: 'string',
          required: false,
          default: 'null',
          description: 'The small note text that will be displayed next to label. The note should be short for example `Optional` or `Max length 160`.'
        },
        {
          name: 'help',
          type: 'string',
          required: false,
          default: 'null',
          description: 'The help text that will be displayed under the input. Useful to add a little detailed information about the input.'
        },
        {
          name: 'placeholder',
          type: 'string',
          required: false,
          default: 'null',
          description: 'The placeholder text for the input.'
        },
        {
          name: 'action',
          type: 'Action',
          required: false,
          default: 'null',
          description: 'The action to be prepened to the input.'
        },
        {
          name: 'icon',
          type: 'VueComponent',
          required: false,
          default: 'null',
          description: 'You may pass Vue Component (probably svg) to display icon in input field.'
        },
        {
          name: 'align',
          type: "'left' | 'center' | 'right'",
          required: false,
          default: 'null',
          description: 'The horizontal alignment of the input.'
        },
        {
          name: 'text',
          type: 'string',
          required: false,
          default: 'null',
          description: 'Add the leading text to the input.'
        },
        {
          name: 'text-after',
          type: 'string',
          required: false,
          default: 'null',
          description: 'Add the trailing text to the input.'
        },
        {
          name: 'color',
          type: 'ColorCallback',
          required: false,
          default: 'null',
          description: 'The color variant of the text. See [Colors section](#colors) for more details.'
        },
        {
          name: 'clearable',
          type: 'boolean',
          required: false,
          default: 'false',
          description: 'Show the "clear button" at end of input. If a user clicks the button, it fires `clear` event.'
        },
        {
          name: 'display-value',
          type: 'string',
          required: false,
          default: 'null',
          description: 'The value displayed when the focus is out.'
        },
        {
          name: 'value',
          type: 'string | number',
          required: false,
          default: 'null',
          description: 'The value of the input. You may also use `v-model` to bind a value to the input.'
        },
        {
          name: 'validation',
          type: 'Validation',
          required: false,
          default: 'null',
          description: 'You can pass Validation object to let input display any errors.'
        }
      ],

      events: [
        {
          name: 'input',
          description: 'Fires when the user input any value to the filed.'
        },
        {
          name: 'blur',
          description: 'Fires when the user blur focus from the filed.'
        },
        {
          name: 'enter',
          description: 'Fires when the user hit enter key.'
        },
        {
          name: 'action',
          description: 'Fires when the user clicks prepended action. Only fires when `action.clickable` property is set to true.'
        },
        {
          name: 'clear',
          description: 'Fires when the user clicks the clear button. Only fires when `clearable` prop is set.'
        }
      ]
    })
  },

  head: {
    title: 'Inputs: Text'
  }
})
</script>
