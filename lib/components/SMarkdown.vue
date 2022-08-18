<template>
  <component
    :is="tag"
    v-if="$slots.default"
    ref="container"
    class="SMarkdown-container"
  >
    <slot v-bind="{ rendered }" />
  </component>
  <component
    :is="tag"
    v-else
    ref="container"
    class="SMarkdown-container"
    v-html="rendered"
  />
</template>

<script setup lang="ts">
import { computed, nextTick, PropType, ref, watch } from 'vue'
import { useMarkdown, useLink, LinkCallback } from '../composables/Markdown'

const props = defineProps({
  content: { type: String, required: true },
  callbacks: { type: Array as PropType<LinkCallback[]>, default: () => [] },
  inline: { type: Boolean, default: false },
  tag: { type: String, default: 'div' }
})

const emit = defineEmits(['clicked'])

const container = ref<Element | null>(null)

const { addListeners, subscribe } = useLink({
  container,
  callbacks: props.callbacks
})

const markdown = useMarkdown()
const rendered = computed(() => markdown(props.content, props.inline))

watch(
  rendered,
  () => nextTick(() => addListeners()),
  { immediate: true }
)

subscribe(payload => emit('clicked', payload))
</script>
