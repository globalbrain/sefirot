<template lang="md">
# Buttons

Buttons allow users to take actions, and make choices, with a single tap.

<ShowcaseButtons />

## Description

It's a very simple button component with various options.

```html
<template>
  <SButton label="BUTTON" @click="submit" />
</template>

<script>
import SButton from '@globalbrains/sefirot/lib/components/buttons/SButton'

export default {
  components: {
    SButton
  },

  methods: {
    submit () {
      // ...
    }
  }
}
</script>
```

## Examples

<ExampleMediumButtons />
<ExampleLargeButtons />
<ExampleRoundedButton />
<ExampleButtonModes />
<ExampleLoadingState />

## API

<SpecProps :props="props" />
<SpecEvents :events="events" />
</template>

<script>
import ShowcaseButtons from '@/components/stories/buttons/ShowcaseButtons'
import ExampleMediumButtons from '@/components/stories/buttons/ExampleMediumButtons'
import ExampleLargeButtons from '@/components/stories/buttons/ExampleLargeButtons'
import ExampleRoundedButton from '@/components/stories/buttons/ExampleRoundedButton'
import ExampleButtonModes from '@/components/stories/buttons/ExampleButtonModes'
import ExampleLoadingState from '@/components/stories/buttons/ExampleLoadingState'
import SpecProps from '@/components/specs/SpecProps'
import SpecEvents from '@/components/specs/SpecEvents'

export default {
  components: {
    ShowcaseButtons,
    ExampleMediumButtons,
    ExampleLargeButtons,
    ExampleRoundedButton,
    ExampleButtonModes,
    ExampleLoadingState,
    SpecProps,
    SpecEvents
  },

  head: {
    title: 'Buttons'
  },

  scrollToTop: true,

  data () {
    return {
      props: [
        {
          name: 'label',
          type: 'String',
          required: true,
          default: '—',
          description: 'The label text for the button.'
        },
        {
          name: 'tag',
          type: 'String',
          required: false,
          default: '\'button\'',
          description: 'The tag for the button. It can be any valid html tag including `nuxt-link`.'
        },
        {
          name: 'to',
          type: 'String',
          required: false,
          default: '\'/\'',
          description: 'The `to` prop for the `nuxt-link` tag. This prop is only useful when `tag` is set to `nuxt-link`.'
        },
        {
          name: 'type',
          type: 'String',
          required: false,
          default: '\'primary\'',
          description: 'The type of the button. Available types are: `primary`, `secondary`, `text`, and `mute`.'
        },
        {
          name: 'mode',
          type: 'String',
          required: false,
          default: '\'neutral\'',
          description: 'The mode of the button. Available modes are: `neutral`, `info`, `success`, `warning`, and `danger`.'
        },
        {
          name: 'size',
          type: 'String',
          required: false,
          default: '\'medium\'',
          description: 'The size of the button. Available sizes are: `medium`, and `large`.'
        },
        {
          name: 'block',
          type: 'Boolean',
          required: false,
          default: 'false',
          description: 'Apply `display: block` to the button.'
        },
        {
          name: 'inverse',
          type: 'Boolean',
          required: false,
          default: 'false',
          description: 'Inverse button theme.'
        },
        {
          name: 'loading',
          type: 'Boolean',
          required: false,
          default: 'false',
          description: 'Show loading indicator.'
        }
      ],

      events: [
        {
          name: 'click',
          description: 'Fires when a user clicks the button.'
        }
      ]
    }
  }
}
</script>
