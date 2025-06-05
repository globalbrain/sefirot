<script setup lang="ts">
import { computed } from 'vue'
import { useMarkdown } from '../composables/Markdown'

const props = defineProps<{
  tag?: string
  content: string
  inline?: boolean
}>()

const markdown = useMarkdown({ inline: props.inline })
const rendered = computed(() => markdown(props.content))
</script>

<template>
  <component
    v-if="$slots.default"
    :is="tag ?? 'div'"
    class="SMarkdown-container"
  >
    <slot v-bind="{ rendered }" />
  </component>

  <component
    v-else
    :is="tag ?? 'div'"
    class="SMarkdown-container"
    v-html="rendered"
  />
</template>
