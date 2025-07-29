<script setup lang="ts">
import { type Component, computed } from 'vue'
import { type UseMarkdownOptions, useMarkdown } from '../composables/Markdown'

export interface SMarkdownProps extends UseMarkdownOptions {
  tag?: Component | string
  content: string
}

const props = withDefaults(defineProps<SMarkdownProps>(), {
  tag: 'div',
  html: true
})

const markdown = useMarkdown(props)
const rendered = computed(() => markdown(props.content))
</script>

<template>
  <component v-if="$slots.default" :is="tag" class="SMarkdown-container">
    <slot v-bind="{ rendered }" />
  </component>
  <component v-else :is="tag" class="SMarkdown-container" v-html="rendered" />
</template>
