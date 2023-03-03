<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue'
import type { LinkCallback, LinkSubscriberPayload } from '../composables/Markdown'
import { useLink, useMarkdown } from '../composables/Markdown'

const props = defineProps<{
  tag?: string
  content: string
  callbacks?: LinkCallback[]
  inline?: boolean
}>()

const emit = defineEmits<{
  (e: 'clicked', payload: LinkSubscriberPayload): void
}>()

const container = ref<Element | null>(null)

const { addListeners, subscribe } = useLink({
  container,
  callbacks: props.callbacks
})

const markdown = useMarkdown()
const rendered = computed(() => markdown(props.content, props.inline ?? false))

watch(
  rendered,
  () => nextTick(() => addListeners()),
  { immediate: true }
)

subscribe((payload) => emit('clicked', payload))
</script>

<template>
  <component
    v-if="$slots.default"
    :is="tag ?? 'div'"
    class="SMarkdown-container"
    ref="container"
  >
    <slot v-bind="{ rendered }" />
  </component>

  <component
    v-else
    :is="tag ?? 'div'"
    class="SMarkdown-container"
    ref="container"
    v-html="rendered"
  />
</template>
