<script setup lang="ts">
import SMarkdown from 'sefirot/components/SMarkdown.vue'

const title = 'Components / SMarkdown / 01. Playground'
</script>

<template>
  <Story :title source="Not available" auto-props-disabled>
    <Board :title>
      <SMarkdown
        class="markdown"
        content="**We** shape our **buildings**. Thereafter, **they** shape **us**."
      />
    </Board>
  </Story>
</template>

<style scoped lang="postcss">
.markdown {
  line-height: 24px;
  font-size: 16px;
}

.markdown :deep(strong) {
  font-weight: 600;
}
</style>
