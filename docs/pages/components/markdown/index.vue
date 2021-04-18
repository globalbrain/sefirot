<template lang="md">
# Markdown

Render markdown strings.

<StoryMarkdownShowcase />

## API

<SpecProps :props="props" />
<SpecEvents :events="events" />
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import StoryMarkdownShowcase from '@/components/markdown/StoryMarkdownShowcase.vue'
import SpecProps from '@/components/SpecProps.vue'
import SpecEvents from '@/components/SpecEvents.vue'
import { useProps } from '@/composables/Props'
import { useEvents } from '@/composables/Events'

export default defineComponent({
  components: {
    StoryMarkdownShowcase,
    SpecProps,
    SpecEvents
  },

  scrollToTop: true,

  setup() {
    const props = useProps([
      {
        name: 'content',
        type: 'String',
        required: true,
        default: '—',
        description: 'The markdown string to parse and render.'
      },
      {
        name: 'inline',
        type: 'Boolean',
        required: false,
        default: 'false',
        description: 'Render `content` without wrapping in `<p>` tags.'
      },
      {
        name: 'tag',
        type: 'String',
        required: false,
        default: "'div'",
        description: 'The root element.'
      },
      {
        name: 'callbacks',
        type: 'Array<LinkCallback>',
        required: false,
        default: '[]',
        description: 'List of callbacks for indexed links.'
      }
    ])

    const events = useEvents([{
      name: 'clicked',
      description: 'Fires when a rendered link is clicked.'
    }])

    return {
      props,
      events
    }
  },

  head: {
    title: 'Markdown'
  }
})
</script>
