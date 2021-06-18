<template lang="md">
# Tooltips

Tooltips display informative text when users hover over or focus on an element.

<StoryTooltipShowcase />

## Long Text

The tooltip may display long text to provide users more information. However, tooltip text should be short as possible. You can use markdown to provide a link to more details.

<StoryTooltipEXLongText />

## API

<SpecProps :props="props" />
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import StoryTooltipShowcase from '@/components/tooltips/StoryTooltipShowcase.vue'
import StoryTooltipEXLongText from '@/components/tooltips/StoryTooltipEXLongText.vue'
import SpecProps from '@/components/SpecProps.vue'
import { useSpec } from '@/composables/Spec'

export default defineComponent({
  components: {
    StoryTooltipShowcase,
    StoryTooltipEXLongText,
    SpecProps
  },

  scrollToTop: true,

  setup() {
    return useSpec({
      props: [
        {
          name: 'tag',
          type: 'string',
          required: false,
          default: "'span'",
          description: 'The tag for the tooltip. It can be any valid html tag.'
        },
        {
          name: 'text',
          type: 'string',
          required: false,
          default: 'null',
          description: 'The text of the tooptip.'
        },
        {
          name: 'position',
          type: "'top' | 'right' | 'bottom' | 'left'",
          required: false,
          default: "'top'",
          description: 'The position to display the tooltip.'
        }
      ]
    })
  },

  head: {
    title: 'Tooltips'
  }
})
</script>
