<template>
  <component :is="tag" v-if="$scopedSlots.default" class="SMarkdown-container">
    <slot v-bind="{ rendered, selector }" />
  </component>
  <component :is="tag" v-else :class="['SMarkdown-container', selector]" v-html="rendered" />
</template>

<script lang="ts">
import { computed, defineComponent, nextTick, PropType, watch } from '@vue/composition-api'
import { useMarkdown, useLink, LinkEvent } from '../composables/Markdown'

export default defineComponent({
  props: {
    content: { type: String, required: true },
    callbacks: { type: Array as PropType<LinkEvent[]>, default: () => [] },
    inline: { type: Boolean, default: false },
    tag: { type: String, default: 'div' }
  },

  setup(props, { emit }) {
    const markdown = useMarkdown()
    const { selector, addListeners, subscribe } = useLink({ callbacks: props.callbacks })

    const rendered = computed(() => markdown(props.content, props.inline))

    watch(
      rendered,
      () => nextTick(() => addListeners()),
      { immediate: true }
    )

    subscribe(payload => emit('clicked', payload))

    return {
      selector,
      rendered
    }
  }
})
</script>
