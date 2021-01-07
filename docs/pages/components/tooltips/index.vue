<template lang="md">
# Tooltips

Tooltips display informative text when users hover over or focus on an element.

<StoryTooltipShowcase />

## API

<SpecProps :props="props" />
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import StoryTooltipShowcase from '@/components/StoryTooltipShowcase.vue'
import SpecProps, { Prop } from '@/components/SpecProps.vue'

export default defineComponent({
  components: {
    StoryTooltipShowcase,
    SpecProps
  },

  scrollToTop: true,

  setup() {
    const props: Prop[] = [
      {
        name: 'tag',
        type: 'string',
        required: false,
        default: '\'span\'',
        description: 'The tag for the tooltip. It can be any valid html tag.'
      },
      {
        name: 'text',
        type: 'string',
        required: true,
        default: '—',
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

    return {
      props
    }
  },

  head: {
    title: 'Tooltips'
  }
})
</script>