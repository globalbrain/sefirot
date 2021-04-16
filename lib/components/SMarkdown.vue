<template>
  <component
    :is="tag"
    v-if="$scopedSlots.default"
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

<script lang="ts">
import { computed, defineComponent, nextTick, PropType, ref, watch } from '@vue/composition-api'
import { useMarkdown, useLink, LinkCallback } from '../composables/Markdown'

export default defineComponent({
  props: {
    content: { type: String, required: true },
    callbacks: { type: Array as PropType<LinkCallback[]>, default: () => [] },
    inline: { type: Boolean, default: false },
    tag: { type: String, default: 'div' }
  },

  setup(props, { emit }) {
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

    return {
      container,
      rendered
    }
  }
})
</script>
