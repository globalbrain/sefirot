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
  <component :is="tag" v-if="$slots.default" class="SMarkdown-container">
    <slot v-bind="{ rendered }" />
  </component>
  <!-- eslint-disable-next-line vue/no-v-text-v-html-on-component -->
  <component :is="tag" v-else class="SMarkdown-container" v-html="rendered" />
</template>
