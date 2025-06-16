<script setup lang="ts">
import { type Component, computed } from 'vue'
import { useMarkdown } from '../composables/Markdown'

const props = withDefaults(defineProps<{
  tag?: string | Component
  content: string
  html?: boolean
  inline?: boolean
}>(), {
  tag: 'div',
  html: true
})

const markdown = useMarkdown({ html: props.html, inline: props.inline })
const rendered = computed(() => markdown(props.content))
</script>

<template>
  <component v-if="$slots.default" :is="tag" class="SMarkdown-container">
    <slot v-bind="{ rendered }" />
  </component>
  <component v-else :is="tag" class="SMarkdown-container" v-html="rendered" />
</template>
